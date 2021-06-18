#!/usr/bin/env sh

# abort on errors
set -e

# Copy in the swagger documentation for Loginservice API
#docs=/opt/Development/Projects/contentservice/docs
#cp ${docs}/swagger.yaml docs/.vuepress/public
#cp ${docs}/index.html docs/.vuepress/public/api-reference.html


# build
yarn docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
#git push -f git@github.com:philcal/junk2.git master:gh-pages
git push -f git@github.com:tooltwist/contentservice.git master:gh-pages
#git push -f https://github.com/tooltwist/contentservice.git master:gh-pages


cd -
