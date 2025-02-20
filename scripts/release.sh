#!/bin/bash

if [ -z "$1" ]; then
  echo "usage: $0 <tag>"
  exit 1
fi

tag=$1
branch="release/$tag"

# создаём тег
git tag "$tag"

# пушим тег
git push origin "$tag"

# создаём ветку release/{tag}
git checkout -b "$branch" "$tag"
git push origin "$branch"