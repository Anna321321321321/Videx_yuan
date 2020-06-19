#!/bin/sh

# typescript compile server code
export NODE_ENV=production
if ! yarn run build:server; then
  exit 1
fi
 # run serverunit tests
export NODE_ENV=test
if ! yarn run test:server; then
  exit 1
fi
