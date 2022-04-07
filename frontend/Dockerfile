# pull the official base image
FROM node:14
WORKDIR /front
ENV PATH /front/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
