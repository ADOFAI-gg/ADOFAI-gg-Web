FROM node:18-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn --frozen-lockfile

COPY . .

ARG API_ENDPOINT

RUN VITE_API_ENDPOINT=${API_ENDPOINT} yarn build

CMD node build
