#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { RythmSocketioCdkStack } from '../lib/rythm-socketio-cdk-stack';

const app = new cdk.App();
new RythmSocketioCdkStack(app, 'RythmSocketioCdkStack');
