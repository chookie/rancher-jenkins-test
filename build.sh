#!/bin/bash

# Set directory to where we expect code to be
cd ${SOURCE_PATH}

echo "Downloading dependencies"
npm install

echo "Runing tests"
npm test

echo "Bulding source"
npm build

echo "Build successful"