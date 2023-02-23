FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json .yarnrc.yml yarn.lock ./

COPY .yarn .yarn

RUN corepack enable && yarn --frozen-lockfile

COPY . .

ARG API_ENDPOINT
ARG OPENGRAPH_ENDPOINT
ARG DISCORD_INVITE

RUN VITE_API_ENDPOINT=${API_ENDPOINT} VITE_OPENGRAPH_ENDPOINT=${OPENGRAPH_ENDPOINT} VITE_DISCORD_INVITE=${DISCORD_INVITE} yarn build

CMD node server.js
