FROM node:alpine

WORKDIR /novelApi

COPY package*.json ./novelApi

RUN yarn --registry=https://registry.npm.taobao.org

COPY . /novelApi