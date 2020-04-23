#!/usr/bin/env bash

function config() {
     find "/etc/nginx" -maxdepth 5 -type f -exec sed -i -e 's|{{APP_DOMAIN}}|'"${APP_DOMAIN}"'|g' {} \;
     find "/etc/nginx" -maxdepth 5 -type f -exec sed -i -e 's|{{API_HOST}}|'"${API_HOST}"'|g' {} \;
}

config

exec "$@"