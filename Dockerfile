FROM node:alpine

WORKDIR /novelApi

COPY package.json yarn.lock ./novelApi/

RUN yarn --registry=https://registry.npm.taobao.org

COPY . /novelApi