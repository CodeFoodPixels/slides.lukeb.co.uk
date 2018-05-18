#!/usr/bin/env bash

npm run build

changes=$(git status -s docs/)

if [ -n "$changes" ]; then
    git config --global user.email "travis@travis-ci.org"
    git config --global user.name "Travis CI"
    git checkout master
    git add docs
    git commit -m "[skip ci] Automated build"
    git remote set-url origin https://${GH_TOKEN}@github.com/lukeb-uk/slides.lukeb.co.uk.git
    git push
fi

