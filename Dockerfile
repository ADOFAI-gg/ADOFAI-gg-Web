FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

RUN corepack enable && pnpm i --frozen-lockfile

COPY . .

ARG API_ENDPOINT
ARG OPENGRAPH_ENDPOINT
ARG DISCORD_INVITE
ARG SUPPORT_MAIL
ARG GTM_ID
ARG GA_ID
ARG USE_ACCOUNT=false
ARG PUBLIC_TELEMETRY_ENDPOINT
ARG PUBLIC_TELEMETRY_API_KEY

ENV IS_RELEASE=1

RUN apk add git && \
    PUBLIC_API_ENDPOINT=${API_ENDPOINT} PUBLIC_OPENGRAPH_ENDPOINT=${OPENGRAPH_ENDPOINT} \
    PUBLIC_DISCORD_INVITE=${DISCORD_INVITE} PUBLIC_SUPPORT_MAIL=${SUPPORT_MAIL} \
    PUBLIC_GTM_ID=${GTM_ID} PUBLIC_GA_ID=${GA_ID} PUBLIC_USE_ACCOUNT=${USE_ACCOUNT} \
    pnpm build && \
    mv static/~partytown build/client/~partytown

RUN apk add jq

RUN cat package.json | jq 'del(.devDependencies) | del(.resolutions) | del(.scripts)' | tee package.json

RUN pnpm pack && mv adofai-gg-*.tgz package.tgz

FROM node:20-alpine AS runner

COPY --from=builder /app/package.tgz .

RUN tar xvzf package.tgz && \
    rm package.tgz && \
    mv package app && \
    cd app && \
    corepack enable && \
    pnpm i --production

WORKDIR /app

CMD ["node", "server.js"]
