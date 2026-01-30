#!/bin/bash

# create dist directory if it doesn't exist
mkdir -p dist

# copy unminified CSS to dist
cp src/continuous-carousel.css dist/continuous-carousel.css

echo Copying done
