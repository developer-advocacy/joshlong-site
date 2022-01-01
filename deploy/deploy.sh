#!/usr/bin/env bash

set -e
set -o pipefail

export APP_NAME=site


export BP_MODE_LOWERCASE=${BP_MODE_LOWERCASE:-development}
export ENV_SUB_DOMAIN=$( [ "${BP_MODE_LOWERCASE}" = "production" ] && echo ""  || echo "${BP_MODE_LOWERCASE}.")
export ROOT_DIR=$(cd $(dirname $0) && pwd)
export OD=${ROOT_DIR}/overlays/${BP_MODE_LOWERCASE}
export PROJECT_ID=${GCLOUD_PROJECT}
export IMAGE_TAG="${BP_MODE_LOWERCASE}${GITHUB_SHA:-}"
export GCR_IMAGE_NAME=gcr.io/${PROJECT_ID}/${APP_NAME}
export IMAGE_NAME=${GCR_IMAGE_NAME}:${IMAGE_TAG}
echo "OD=$OD"
echo "BP_MODE_LOWERCASE=$BP_MODE_LOWERCASE"
echo "GCR_IMAGE_NAME=$GCR_IMAGE_NAME"
echo "IMAGE_NAME=$IMAGE_NAME"
echo "IMAGE_TAG=$IMAGE_TAG"

cd $(dirname $0)/..
ROOT_DIR=$(pwd)
cd $ROOT_DIR

rm -rf $ROOT_DIR/build
rm -rf $ROOT_DIR/dist

PROD_ENV_FILE=${ROOT_DIR}/.env.production
rm $PROD_ENV_FILE
touch $PROD_ENV_FILE
echo "VUE_APP_API_ROOT=${API_ROOT}"
echo "VUE_APP_SERVICE_ROOT=${API_ROOT}" >> ${PROD_ENV_FILE}
echo "VUE_APP_GIT_HASH=${GITHUB_SHA}" >> ${PROD_ENV_FILE}
echo "VUE_APP_BP_MODE=${BP_MODE_LOWERCASE}" >> ${PROD_ENV_FILE}

echo "--------------------------"
echo "The production environment file contains: "
cat $PROD_ENV_FILE
echo "--------------------------"

npm install && npm run build

mkdir -p ${ROOT_DIR}/build/public
cp $ROOT_DIR/deploy/nginx-buildpack-config/* ${ROOT_DIR}/build
cp -r $ROOT_DIR/dist/* ${ROOT_DIR}/build/public
cd $ROOT_DIR/build

pack build $APP_NAME --builder paketobuildpacks/builder:full --buildpack gcr.io/paketo-buildpacks/nginx:latest  --env PORT=8080
image_id=$(docker images -q $APP_NAME)

docker tag "${image_id}" $IMAGE_NAME
docker push $IMAGE_NAME
echo "pushing ${image_id} to $IMAGE_NAME "
echo "tagging ${GCR_IMAGE_NAME}"

export RESERVED_IP_NAME=${APP_NAME}-${BP_MODE_LOWERCASE}-ip
gcloud compute addresses list --format json | jq '.[].name' -r | grep $RESERVED_IP_NAME ||  gcloud compute addresses create $RESERVED_IP_NAME --global

cd $OD
kustomize edit set image $GCR_IMAGE_NAME=$IMAGE_NAME
kustomize build ${OD} | kubectl apply -f -
