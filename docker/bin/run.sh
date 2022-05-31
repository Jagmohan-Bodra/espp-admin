#!/usr/bin/env bash

echo '> Running confd...'
confd -onetime -backend env

set -e

nginx -g "daemon off;"