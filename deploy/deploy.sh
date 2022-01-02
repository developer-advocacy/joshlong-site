#!/usr/bin/env bash

set -e
set -o pipefail

## i setup ROOT_DIR=$GITHUB_WORKSPACE in the deploy.yaml for the github action
export APP_NAME=joshlong-com-site
export GCR_IMAGE_NAME=gcr.io/${PROJECT_ID}/${APP_NAME}
export IMAGE_NAME=${GCR_IMAGE_NAME}
export PROD_ENV_FILE=${ROOT_DIR}/.env.production
export RESERVED_IP_NAME=${APP_NAME}-ip


echo "--------------------------"
echo "The environment contains: "
echo APP_NAME=$APP_NAME
echo ROOT_DIR=$ROOT_DIR
echo GCR_IMAGE_NAME=$GCR_IMAGE_NAME
echo IMAGE_NAME=$IMAGE_NAME
echo PROD_ENV_FILE=$PROD_ENV_FILE
echo RESERVED_IP_NAME=$RESERVED_IP_NAME
echo "--------------------------"

cd $ROOT_DIR

rm -rf $ROOT_DIR/build || echo "couldn't reset $ROOT_DIR/build "
rm -rf $ROOT_DIR/dist || echo "couldn't reset $ROOT_DIR/dist"
rm $PROD_ENV_FILE || echo "couldn't reset $PROD_ENV_FILE"

touch $PROD_ENV_FILE

echo "VUE_APP_SERVICE_ROOT=${API_ROOT}" >> ${PROD_ENV_FILE}
echo "VUE_APP_GIT_HASH=${GITHUB_SHA}" >> ${PROD_ENV_FILE}

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
echo "the Github SHA is ${GITHUB_SHA}"

PUSH_NAME=${IMAGE_NAME}:${GITHUB_SHA}
docker tag "${image_id}" ${IMAGE_NAME}:${GITHUB_SHA}
docker tag "${image_id}" ${IMAGE_NAME}:latest
docker push "$PUSH_NAME"
echo "docker pushed ${image_id} to $IMAGE_NAME "
gcloud compute addresses list --format json | jq '.[].name' -r | grep $RESERVED_IP_NAME ||  gcloud compute addresses create $RESERVED_IP_NAME --global
kubectl delete -f $ROOT_DIR/deploy/k8s/deployment.yaml || echo "couldn't delete the existing deployment..."
kubectl apply -f $ROOT_DIR/deploy/k8s/deployment.yaml