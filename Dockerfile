FROM node:alpine

WORKDIR /novelApi

COPY package*.json ./novelApi

RUN yarn

COPY . /novelApi