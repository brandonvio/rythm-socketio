#bin/bash
ecs_cluster=rythm-cluster
ecs_service=rythm-socketio-service

# aws ecs update-service --desired-count 0 --cluster $ecs_cluster --service $ecs_service --profile $aws_profile
# aws ecs wait services-stable --cluster $ecs_cluster --services $ecs_service --profile $aws_profile
# aws ecs update-service --desired-count 1 --cluster $ecs_cluster --service $ecs_service --force-new-deployment --profile $aws_profile

aws ecs update-service --desired-count 0 --cluster $ecs_cluster --service $ecs_service
aws ecs wait services-stable --cluster $ecs_cluster --services $ecs_service
aws ecs update-service --desired-count 1 --cluster $ecs_cluster --service $ecs_service --force-new-deployment
