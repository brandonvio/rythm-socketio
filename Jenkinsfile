// Testing webhook. #2
pipeline {
    agent any
    stages {
        stage('Validate') {
            steps {
                sh 'aws --version'
                sh 'cdk --version'
                sh 'node --version'
                sh 'npm --version'
                sh 'tsc --version'
            }
        }

        // stage('Build') {
        //     parallel {
        //         stage('Build Lambda') {
        //             steps {
        //                 dir('lambda-app') {
        //                     sh 'npm install'
        //                     sh 'npm run build'
        //                     sh 'cp -r ./build ../cdk-app-02/builds/lambda-app-build'
        //                 }
        //             }
        //         }

        //         stage('Build React') {
        //             steps {
        //                 dir('react-app') {
        //                     sh 'npm install'
        //                     sh 'npm run build'
        //                     sh 'cp -r ./build ../cdk-app-02/builds/react-app-build'
        //                 }
        //             }
        //         }
        //     }
        // }

        // stage('Deploy') {
        //     parallel {
        //         stage('Run the CDK') {
        //             steps {
        //                 dir('cdk-app-02') {
        //                     withAWS(credentials: 'kysen-build-dev', region: 'us-east-1') {
        //                         sh 'aws s3 ls'
        //                         sh 'npm install'
        //                         sh 'npm run build'
        //                         sh 'cdk deploy \\"*\\" --require-approval=never'
        //                         sh 'aws s3 sync builds/react-app-build/build s3://origin.mytodos.xyz --acl public-read'
        //                         sh 'aws cloudfront create-invalidation --distribution-id E3B6B3IT43ZK0P --paths "/*"'
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
    }
}
