#!/bin/bash

# 设置变量
IMAGE_NAME="$1"
# SERVER_IP="$1"
# SERVER_PASSWORD="$2"

# 停止旧的容器
docker stop quotation-ui || true

# 启动新的容器
docker run -d --name quotation-ui  -p 8089:80 --rm $IMAGE_NAME
# 检查docker run是否成功
if [ $? -eq 0 ]
then
echo "Docker run was successful."
else
echo "Docker run failed."
fi
