import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecr from "@aws-cdk/aws-ecr";
import * as iam from "@aws-cdk/aws-iam";

interface SocketioSvcStackProps extends cdk.StackProps {
  cluster: ecs.ICluster;
  vpc: ec2.IVpc;
}

export class SocketioSvcStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: SocketioSvcStackProps) {
    super(scope, id, props);

    new cdk.CfnOutput(this, "RythmClusterARN", {
      value: props.cluster.clusterArn,
    });

    const repo = ecr.Repository.fromRepositoryName(this, "SocketioSvcRepo", "rythm-svc-socketio");

    // Create the role to run Tasks.
    const role = new iam.Role(this, "SocketioTaskRole", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
      roleName: "rythm-socketio-svc-role",
      managedPolicies: [
        iam.ManagedPolicy.fromManagedPolicyArn(
          this,
          "SecretsManager",
          "arn:aws:iam::aws:policy/SecretsManagerReadWrite"
        ),
      ],
    });

    // Price Service Task.
    const task = new ecs.TaskDefinition(this, "SocketioTaskDef", {
      memoryMiB: "512",
      cpu: "256",
      networkMode: ecs.NetworkMode.AWS_VPC,
      compatibility: ecs.Compatibility.EC2_AND_FARGATE,
      taskRole: role,
    });

    const container = task.addContainer("SocketioTaskContainer", {
      image: ecs.ContainerImage.fromEcrRepository(repo, "latest"),
      cpu: 256,
      memoryLimitMiB: 512,
      logging: new ecs.AwsLogDriver({ streamPrefix: "SocketioService" }),
      environment: {
        STAGE: "prod",
      },
    });

    container.addPortMappings({
      containerPort: 3000,
      hostPort: 3000,
    });

    const securityGroup = new ec2.SecurityGroup(this, "SocketioSvcSecurityGroup", {
      securityGroupName: "rythm-socketio-svc-sg",
      vpc: props.vpc,
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3000), "socketio port opening");

    const service = new ecs.FargateService(this, "SocketioService", {
      vpcSubnets: props.vpc.selectSubnets({ subnetType: ec2.SubnetType.PUBLIC }),
      serviceName: "rythm-socketio-service",
      cluster: props.cluster,
      taskDefinition: task,
      desiredCount: 1,
      assignPublicIp: true,
      securityGroups: [securityGroup],
    });
  }
}
