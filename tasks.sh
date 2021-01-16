aws ecs list-tasks --cluster rythm-cluster --service-name rythm-socketio-service
# aws ecs stop-task --cluster rythm-cluster --task arn:aws:ecs:us-west-2:778477161868:task/rythm-cluster/c2c3ecb055194d06ad4e2ea5b2ebd10f
# aws ecs describe-tasks --cluster rythm-cluster --tasks arn:aws:ecs:us-west-2:778477161868:task/rythm-cluster/5cb2ca5c49af41cda538e5f6f72db950

ecs-cli ps --cluster rythm-cluster