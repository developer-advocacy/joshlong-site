#!/usr/bin/env bash

set -e
set -o pipefail

export APP_NAME=joshlong-com-site
export ROOT_DIR=$GITHUB_WORKSPACE
export IMAGE_TAG="${GITHUB_SHA:-latest}"
export GCR_IMAGE_NAME=gcr.io/${PROJECT_ID}/${APP_NAME}
export IMAGE_NAME=${GCR_IMAGE_NAME}:${IMAGE_TAG}
export PROD_ENV_FILE=${ROOT_DIR}/.env.production
export RESERVED_IP_NAME=${APP_NAME}-ip



echo "--------------------------"
echo "The environment contains: "
echo APP_NAME=$APP_NAME
echo ROOT_DIR=$ROOT_DIR
echo IMAGE_TAG=$IMAGE_TAG
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

docker tag "${image_id}" $IMAGE_NAME
docker push $IMAGE_NAME
echo "pushing ${image_id} to $IMAGE_NAME "
echo "tagging ${GCR_IMAGE_NAME}"

gcloud compute addresses list --format json | jq '.[].name' -r | grep $RESERVED_IP_NAME ||  gcloud compute addresses create $RESERVED_IP_NAME --global

cd $ROOT_DIR/k8s/
kubectl apply -f .


#
#kustomize edit set image $GCR_IMAGE_NAME=$IMAGE_NAME
#kustomize build ${OD} | kubectl apply -f -