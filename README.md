# Sample for testing Rancher and Jenkins

* Has client which displays data from api.
* Api which sends data from a database.
* MongoDB database which runs in docker.

# Building with docker
Base Images are the centralised containers that are used within docker-compose files in individual projects. 

* Open terminal in the root directory of this project.

## Base Image
* If not already created then create Node build docker</br> 
`docker build -f Dockerfile.build -t cardano/node-build:latest .`

## Running a build
* Run a builds in the build container</br> 
`docker run --rm -it -v $PWD/api/:/node/src/api/ -e NODE_ENV=production -e SOURCE_PATH=/node/src/api/ cardano/node-build:latest`

# Local Development
## Base Image
Image for node.js application development on a local computer.

`docker build -f Dockerfile.local -t cardano/node-local:latest .`

## Using in Projects
Create a docker-compose file in root of each project.

# Release
## Base Image
Image for node.js application is production.

**NOTE:** Assumes you are transpiling your project into a dist directory which contains all files needed for release, except node_modules, which will be installed as part of the process.

`docker build -f Dockerfile.release -t cardano/node-release:latest .`

## Using in Projects
Create a docker-compose file in root of each project.