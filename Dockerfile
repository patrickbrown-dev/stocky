FROM node:lts-alpine

WORKDIR /usr/src/stocky

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc

CMD [ "node", "target/index.js" ]