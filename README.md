# Sample for testing Rancher and Jenkins

* Has client which displays data from api.
* Api which sends data from a database.
* MongoDB database which runs in docker.

# Building with docker

* Open terminal in the root directory of this project.
* If not already created then create Node build docker</br> 
`docker build -t cardano/node-builder .`
* Run a builds in the build container</br> 
`docker run --rm -it -v $PWD/api/:/node/src/api/ -e NODE_ENV=production -e SOURCE_PATH=/node/src/api/ cardano/node-builder:latest`