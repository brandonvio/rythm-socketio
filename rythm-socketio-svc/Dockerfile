FROM 778477161868.dkr.ecr.us-west-2.amazonaws.com/node-12-20-0-alpine:latest
# FROM node:12.20.0-buster-slim

WORKDIR /usr/rythm-socketio-serv
COPY ./build/ .
ENTRYPOINT ["node", "Server.js"]