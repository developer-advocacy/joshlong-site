#!/usr/bin/env bash
# builds the site and packages it as an nginx container image with paketo. the github actions
# workflow publishes it; test_local_build.sh builds it into the local docker daemon.
set -euo pipefail

: "${ROOT_DIR:?ROOT_DIR is required}"
: "${IMAGE_NAME:?IMAGE_NAME is required}"
API_ROOT="${API_ROOT:-https://api.joshlong.com}"

echo "the root directory is ${ROOT_DIR}."
cd "$ROOT_DIR"
rm -rf dist build

# vue cli bakes these into the bundle at build time.
cat > .env.production <<ENV
VUE_APP_SERVICE_ROOT=${API_ROOT}
VUE_APP_GIT_HASH=${GITHUB_SHA:-$(git rev-parse HEAD)}
ENV
echo "the production environment file contains:"
cat .env.production

npm ci
npm run lint -- --no-fix
npm run build

mkdir -p build/public
cp .github/workflows/nginx-buildpack-config/* build
cp -r dist/* build/public
cd build
pack build "$IMAGE_NAME" --builder paketobuildpacks/builder-jammy-base --buildpack paketo-buildpacks/nginx \
  --env PORT=8080 ${PUBLISH:+--publish}
