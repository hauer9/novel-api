FROM node:10

RUN mkdir -p /novelApi

WORKDIR /novelApi

COPY package.json yarn.lock ./novelApi/

RUN yarn global add nodemon --registry=https://registry.npm.taobao.org && yarn --registry=https://registry.npm.taobao.org

COPY . /novelApi