#!/bin/bash

if sudo lsof -i :5432; then
 pid=$(sudo lsof -t -i :5432)
 sudo kill $pid
 sleep 2 
fi
echo "Iniciando o docker..."

sudo docker start blog-api-node
