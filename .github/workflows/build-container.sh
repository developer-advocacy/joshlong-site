#!/usr/bin/env bash
# builds the site and packages it as a node.js container image with paketo. the github actions
# workflow publishes it; test_local_build.sh builds it into the local docker daemon.
#
# the site renders its pages on the server, so it runs as a node.js process, not as static files.
# `nuxt build` writes a self-contained server, dependencies and all, to .output, and only that
# goes into the image.
set -euo pipefail

: "${ROOT_DIR:?ROOT_DIR is required}"
: "${IMAGE_NAME:?IMAGE_NAME is required}"

echo "the root directory is ${ROOT_DIR}."
cd "$ROOT_DIR"
rm -rf .output build

npm ci
npm run lint
npx nuxt typecheck
npm run build

mkdir -p build
cp -r .output build/.output
# the node.js the image runs. paketo's run image has no libatomic, which node 26 needs, so not
# whatever node happens to be building this.
NODE_VERSION=24
cat > build/package.json <<JSON
{
  "name": "joshlong-site",
  "private": true,
  "engines": {"node": "${NODE_VERSION}.x"},
  "scripts": {"start": "node .output/server/index.mjs"}
}
JSON

# the server listens on $PORT. cloud foundry sets it; BPE_DEFAULT_PORT makes 8080 the default otherwise.
cd build
pack build "$IMAGE_NAME" --builder paketobuildpacks/builder-jammy-base --buildpack paketo-buildpacks/nodejs \
  --env BP_NODE_RUN_SCRIPTS= --env BP_LAUNCHPOINT=.output/server/index.mjs --env BPE_DEFAULT_PORT=8080 \
  ${PUBLISH:+--publish}
