#!/bin/bash

# declare variables
items='continuous-carousel.css continuous-carousel.js'

# remove directory contents
rm -rf dist

# create directory
mkdir dist

# copy items
for item in $items
do
    cp $item dist/$item
done

echo Copying done
