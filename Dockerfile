FROM node:10

RUN mkdir -p /novelApi

WORKDIR /novelApi

COPY package.json yarn.lock ./novelApi/

RUN yarn install --registry=https://registry.npm.taobao.org && yarn global add nodemon ts-node --registry=https://registry.npm.taobao.org

COPY . /novelApi