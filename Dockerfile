FROM node:alpine

RUN mkdir -p /novelApi

WORKDIR /novelApi

COPY package.json yarn.lock ./novelApi/

RUN yarn install --registry=https://registry.npm.taobao.org

COPY . /novelApi