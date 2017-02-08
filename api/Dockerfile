# build: docker build -f Dockerfile -t cardano/rancher-jenkins-sample-api:latest .
# compose: docker-compose -f docker-compose.yml up
# docker-compose -f docker-compose.yml up --build
#
# docker run -p 8081:8081 -d cardano/rancher-jenkins-sample-api:latest
# docker run -p 8081:8081 cardano/rancher-jenkins-sample-api:latest
# docker run -it --rm cardano/rancher-jenkins-sample-api:latest bash

FROM    node:6.9.4

MAINTAINER Cardano
LABEL Name=rancher-jenkins-sample-api Version=1.0.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app/
RUN npm install

# Bundle app source
ADD dist /usr/src/app

# app binds to port 8080 so you'll use the instruction to have it mapped by the docker daemon
EXPOSE 8081

CMD [ "npm", "start" ]
