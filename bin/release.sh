#!/bin/bash

IMAGE_NAME="message-api-node"

# Build the Docker image
docker build -t $IMAGE_NAME .

# Publish the Docker image
docker tag $IMAGE_NAME sealedsaint/$IMAGE_NAME
docker push sealedsaint/$IMAGE_NAME
