FROM node:12

RUN mkdir -p /novelApi

WORKDIR /novelApi

COPY package.json yarn.lock ./novelApi/

RUN yarn global add nodemon ts-node --registry=https://registry.npm.taobao.org && \
  yarn install --frozen-lockfile--registry=https://registry.npm.taobao.org

COPY . /novelApi