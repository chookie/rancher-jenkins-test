#!/bin/bash
# Creates a Nod.js nuild environment

set -e

# Set directory to where we expect code to be
cd ${SOURCE_PATH}
pwd
ls

echo "Downloading dependencies"
npm install

echo "Bulding source"
npm run build

echo "Build complete"