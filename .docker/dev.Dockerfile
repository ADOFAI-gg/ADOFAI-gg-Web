FROM node:17

EXPOSE 3000

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY . .
