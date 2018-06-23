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
    IFS=' '
    data="{\"files\":["
    files=$(git diff-tree --no-commit-id --name-only -r --root $(git rev-list --no-merges -n 1 HEAD))
    prefix="docs/"
    while read line; do data="${data}\"https://slides.lukeb.co.uk/${line#$prefix}\","; done <<< $files
    data="${data::-1}]}"
    curl -X POST \
         -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
         -H "X-Auth-Key: $CLOUDFLARE_TOKEN" \
         -H "Content-Type: application/json" \
         --data ${data} \
         https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE/purge_cache

fi

