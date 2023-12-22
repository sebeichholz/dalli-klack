#!/bin/bash
for f in *.jpg *.JPG *.jpeg; do
  mv "$f" $RANDOM$RANDOM.jpg
done