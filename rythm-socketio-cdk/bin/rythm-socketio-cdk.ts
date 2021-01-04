#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { RythmSocketioCdkStack } from "../lib/_rythm-socketio-cdk-stack";

const app = new cdk.App();
new RythmSocketioCdkStack(app, "RythmSocketioCdkStack", {
  env: {
    account: "778477161868",
    region: "us-west-2",
  },
});
