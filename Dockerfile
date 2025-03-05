FROM --platform=$BUILDPLATFORM node:22-alpine AS builder

ARG GH_NPM_TOKEN

RUN mkdir -p /app

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

RUN echo '//npm.pkg.github.com/:_authToken=${GH_NPM_TOKEN}' >> .npmrc

RUN corepack enable && pnpm i --frozen-lockfile

COPY . .

ENV IS_RELEASE=1

RUN apk add git && \
    pnpm build

RUN apk add jq

RUN cat package.json | jq 'del(.devDependencies) | del(.resolutions) | del(.scripts)' | tee package.json

RUN pnpm pack && mv adofai-gg-*.tgz package.tgz

FROM node:22-alpine AS runner

COPY --from=builder /app/package.tgz .

RUN tar xvzf package.tgz && \
    rm package.tgz && \
    mv package app && \
    cd app && \
    echo '//npm.pkg.github.com/:_authToken=${GH_NPM_TOKEN}' >> .npmrc && \
    corepack enable && \
    pnpm i --production

WORKDIR /app

CMD ["node", "server.js"]
