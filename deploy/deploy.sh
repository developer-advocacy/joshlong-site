#!/usr/bin/env bash


set -e
set -o pipefail


export ENV_SUB_DOMAIN=$( [ "${BP_MODE_LOWERCASE}" = "production" ] && echo ""  || echo "${BP_MODE_LOWERCASE}.")
export OD=${ROOT_DIR}/overlays/${BP_MODE_LOWERCASE}
export PROJECT_ID=${GCLOUD_PROJECT}
# export IMAGE_NAME=gcr.io/${PROJECT_ID}/${APP_NAME}
export IMAGE_NAME=us-docker.pkg.dev/${PROJECT_ID}/developer-advocacy-artifact-registry/${APP_NAME}:latest
echo "OD=$OD"
echo "BP_MODE_LOWERCASE=$BP_MODE_LOWERCASE"
echo "IMAGE_NAME=$IMAGE_NAME"


rm -rf $ROOT_DIR/build
rm -rf $ROOT_DIR/dist

PROD_ENV_FILE=${ROOT_DIR}/.env.production
rm -rf $PROD_ENV_FILE
touch $PROD_ENV_FILE
echo "VUE_APP_SERVICE_ROOT=${API_ROOT}" >> "${PROD_ENV_FILE}"
echo "VUE_APP_GIT_HASH=${GITHUB_SHA}" >> "${PROD_ENV_FILE}"
echo "VUE_APP_API_ROOT=${API_ROOT}"

echo "--------------------------"
echo "The production environment file contains: "
cat $PROD_ENV_FILE
echo "--------------------------"

npm install && npm run build

mkdir -p ${ROOT_DIR}/build/public
cp $ROOT_DIR/deploy/nginx-buildpack-config/* ${ROOT_DIR}/build
cp -r $ROOT_DIR/dist/* ${ROOT_DIR}/build/public
cd $ROOT_DIR/build

docker images -q $IMAGE_NAME | while read  l ; do docker rmi $l -f ; done

pack build  $IMAGE_NAME \
  --builder paketobuildpacks/builder:base \
 --buildpack docker.io/paketobuildpacks/nginx:latest \
 --env PORT=8080

docker push $IMAGE_NAME

export RESERVED_IP_NAME=${NS_NAME}-${APP_NAME}-ip
gcloud compute addresses list --format json | jq '.[].name' -r | grep $RESERVED_IP_NAME ||  gcloud compute addresses create $RESERVED_IP_NAME --global
echo "created static IP named ${RESERVED_IP_NAME}"

cd $GITHUB_WORKSPACE
kubectl delete -f deploy/k8s/deployment.yaml || echo "could not find the deployment to delete..."
kubectl apply -f deploy/k8s
