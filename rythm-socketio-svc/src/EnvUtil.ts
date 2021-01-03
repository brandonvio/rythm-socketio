import { SecretsManager } from "@aws-sdk/client-secrets-manager";
require("dotenv").config();

const sm = new SecretsManager({});

export class EnvUtil {
  public static async getSecret(secretId): Promise<string> {
    const response = await sm.getSecretValue({ SecretId: secretId });
    console.log(`// Getting secret for secretid: ${secretId}.`);
    return response["SecretString"];
  }

  public static getEnv(name): string {
    const value = process.env[name];
    console.log(`// Getting environment variable ${name} value is: ${value}.`);
    return value;
  }
}
