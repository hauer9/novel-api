FROM node:10

RUN mkdir -p /novelApi

WORKDIR /novelApi

COPY package.json ./novelApi/

RUN npm install nodemon -g --registry=https://registry.npm.taobao.org && npm install --registry=https://registry.npm.taobao.org

COPY . /novelApi