FROM node:lts-alpine

RUN npm install -g create-react-app
WORKDIR project