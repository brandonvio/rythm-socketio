aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 778477161868.dkr.ecr.us-west-2.amazonaws.com
docker pull node:12.20.0-alpine3.12
docker tag node:12.20.0-alpine3.12 778477161868.dkr.ecr.us-west-2.amazonaws.com/node-12-20-0-alpine:latest
docker push 778477161868.dkr.ecr.us-west-2.amazonaws.com/node-12-20-0-alpine:latest