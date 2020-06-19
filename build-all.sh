#!/bin/sh

# code style test
# if ! yarn run test:prettier; then
#   exit 1
# fi

# typescript compile server code
export NODE_ENV=production
if ! yarn run build:server; then
  exit 1
fi
# copy pug views to dist folder
cp -a ./server/src/views/ ./dist/server/src/views/
# run serverunit tests (disabled for now)
# export NODE_ENV=test
# if ! yarn run test:server; then
#  exit 1
# fi

# run client unit tests
# export NODE_ENV=test
# if ! yarn run test:client; then
#   exit 1
# fi
# webpack build client
export NODE_ENV=production
if ! yarn run build:client; then
  exit 1
fi

# webpack build demo
export NODE_ENV=production
if ! yarn run build:demo; then
  exit 1
fi

# next build ssr
export NODE_ENV=production
if ! yarn run build:next; then
  exit 1
fi

# create folder
mkdir -p ./dist/server/src/next

# copy build file to dist folder
cp -a ./server/src/next/.next/ ./dist/server/src/next/.next/
