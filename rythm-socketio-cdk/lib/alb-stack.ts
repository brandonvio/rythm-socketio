import * as cdk from "@aws-cdk/core";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as elbv2 from "@aws-cdk/aws-elasticloadbalancingv2";
import * as ssm from "@aws-cdk/aws-ssm";
import * as route53 from "@aws-cdk/aws-route53";
import * as targets from "@aws-cdk/aws-route53-targets";
import * as elbTargets from "@aws-cdk/aws-elasticloadbalancingv2-targets";
import * as acm from "@aws-cdk/aws-certificatemanager";
import * as ecsp from "@aws-cdk/aws-ecs-patterns";

export class AlbStack extends cdk.Stack {
  public readonly loadBalancer: elbv2.ApplicationLoadBalancer;

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const hostedZoneId = ssm.StringParameter.valueForStringParameter(this, "rythm-hostedzoneid");

    const certificateCrn = ssm.StringParameter.valueForStringParameter(
      this,
      "rythm-east-certificate-arn"
    );

    // //*****************************************************************************/
    // // CloudFront.
    // //*****************************************************************************/
    const sslCertificate = acm.Certificate.fromCertificateArn(
      this,
      "RythmCertificate",
      certificateCrn
    );

    //*****************************************************************************/
    // Deployment.
    //*****************************************************************************/
    const hostedZone = route53.PublicHostedZone.fromHostedZoneAttributes(this, "hostedZone", {
      hostedZoneId: hostedZoneId,
      zoneName: "rythm.cc",
    });

    const loadBalancer = elbv2.ApplicationLoadBalancer.fromLookup(this, "ALB", {
      loadBalancerTags: {
        // Finds a load balancer matching all tags.
        application: "rythm",
      },
    });

    const svc = new ecsp.ApplicationLoadBalancedFargateService(this, "id", {
      assignPublicIp: true,
      certificate: sslCertificate,
      cpu: 256,
      domainName: "socketio.rythm.cc",
      domainZone: hostedZone,
      desiredCount: 1,
      serviceName: "sdfsfsf",
    });

    const listner = loadBalancer.addListener("SocketIoListner", {
      port: 443,
      protocol: elbv2.ApplicationProtocol.HTTPS,
    });

    // listner.addTargets("SocketIoTarget", {
    //     targets: [new elbTargets.]
    // });

    const arecord = new route53.ARecord(this, "SocketIoArecord", {
      zone: hostedZone,
      recordName: "socketio.rythm.cc",
      target: route53.RecordTarget.fromAlias(new targets.LoadBalancerTarget(loadBalancer)),
    });
  }
}
