FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

ARG API_ENDPOINT
ARG OPENGRAPH_ENDPOINT

RUN VITE_API_ENDPOINT=${API_ENDPOINT} VITE_OPENGRAPH_ENDPOINT=${OPENGRAPH_ENDPOINT} yarn build

CMD node build
