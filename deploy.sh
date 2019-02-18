#!/bin/sh

# echo $MOECOOP_DOMAIN > dist/CNAME

cd dist

git init
git config user.name 'Travis CI'
git config user.email "$MOECOOP_MAIL"
git add -A
git commit -m "Deploy to Github Pages"
git push -f -q "https://${GH_TOKEN}@github.com/${MOECOOP_REPO}.git" update:gh-pages > /dev/null 2>&1
