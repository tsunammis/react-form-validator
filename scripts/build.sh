#!/bin/bash -e

rm -rf dist

# NPM Module
./node_modules/.bin/babel -d dist/npm/lib ./lib
cp README.md dist/npm
find -X dist/npm/lib -type d -name __tests__ | xargs rm -rf
node -p 'p=require("./package");p.main="lib";p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/npm/package.json

# Global Module
NODE_ENV=production ./node_modules/.bin/webpack dist/npm/lib/index.js dist/global/ReactFormValidator.js
NODE_ENV=production COMPRESS=1 ./node_modules/.bin/webpack dist/npm/lib/index.js dist/global/ReactFormValidator.min.js