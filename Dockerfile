FROM node:lts-alpine

WORKDIR /usr/src/stocky

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]