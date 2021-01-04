// Testing webhook. #9
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

        stage('Building') {
            steps {
                withAWS(credentials: 'build-credentials', region: 'us-west-2') {
                    dir('rythm-socketio-cdk') {
                        sh 'npm install'
                        sh 'cdk list'
                        sh 'cdk synth --all'
                        sh 'cdk deploy "RythmSocketioCdkStackSocketioEcrStack1F27DE93" --require-approval=never'
                    }
                    dir('rythm-socketio-svc') {
                        sh 'npm install'
                        sh 'tsc'
                        sh 'npm run build'
                        sh 'cp .env ./build/'
                        sh 'aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 778477161868.dkr.ecr.us-west-2.amazonaws.com'
                        sh 'docker build -t rythm-svc-socketio .'
                        sh 'docker tag rythm-svc-socketio:latest 778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-svc-socketio:latest'
                        sh 'docker push 778477161868.dkr.ecr.us-west-2.amazonaws.com/rythm-svc-socketio:latest'
                    }
                    dir('rythm-socketio-cdk') {
                        sh 'cdk deploy "RythmSocketioCdkStackSocketioSvcStackCCE4EA7E" --require-approval=never'
                    }
                }
            }
        }

        stage('ECS') {
            steps {
                withAWS(credentials: 'build-credentials', region: 'us-west-2') {
                    // sh 'aws ecs update-service --desired-count 0 --cluster rythm-cluster --service rythm-socketio-service'
                    // sh 'aws ecs wait services-stable --cluster rythm-cluster --services rythm-socketio-service'
                    // sh 'aws ecs update-service --desired-count 1 --cluster rythm-cluster --service rythm-socketio-service --force-new-deployment'
                }
            }
        }
    }
}
