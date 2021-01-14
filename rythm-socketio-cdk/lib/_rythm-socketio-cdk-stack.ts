import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecs from "@aws-cdk/aws-ecs";
import { EcrStack } from "./ecr-stack";
import { SocketioSvcStack } from "./socketio-svc-stack";
import { AlbStack } from "./alb-stack";

export class RythmSocketioCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, "RythmVpc", {
      tags: {
        application: "rythm",
      },
    });

    const cluster = ecs.Cluster.fromClusterAttributes(this, "RythmCluster", {
      vpc: vpc,
      clusterName: "rythm-cluster",
      securityGroups: [],
    });

    const ecrStack = new EcrStack(this, "SocketioEcrStack", {
      stackName: "socketio-ecr-stack",
      env: props?.env,
    });

    const svcStack = new SocketioSvcStack(this, "SocketioSvcStack", {
      stackName: "socketio-svc-stack",
      env: props?.env,
      cluster: cluster,
      vpc: vpc,
    });

    // const albStack = new AlbStack(this, "AlbStack", {
    //   stackName: "alb-stack",
    //   env: props?.env,
    // });
  }
}
