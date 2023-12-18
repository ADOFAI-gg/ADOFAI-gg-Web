FROM node:18-alpine AS builder

RUN mkdir -p /app

WORKDIR /app

COPY package.json .yarnrc.yml yarn.lock ./

COPY .yarn .yarn

RUN corepack enable && yarn --frozen-lockfile

COPY . .

ARG API_ENDPOINT
ARG OPENGRAPH_ENDPOINT
ARG DISCORD_INVITE
ARG SUPPORT_MAIL
ARG GTM_ID
ARG GA_ID

ARG SENTRY_ENV
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN
ARG SENTRY_URL
ARG SENTRY_DSN

RUN apk add git && \
    PUBLIC_API_ENDPOINT=${API_ENDPOINT} PUBLIC_OPENGRAPH_ENDPOINT=${OPENGRAPH_ENDPOINT} \
    PUBLIC_DISCORD_INVITE=${DISCORD_INVITE} PUBLIC_SUPPORT_MAIL=${SUPPORT_MAIL} \
    PUBLIC_GTM_ID=${GTM_ID} PUBLIC_GA_ID=${GA_ID} SENTRY_ORG=${SENTRY_ORG} \
    PUBLIC_SENTRY_ENV=${SENTRY_ENV} PUBLIC_SENTRY_DSN=${SENTRY_DSN} SENTRY_ORG=${SENTRY_ORG} SENTRY_PROJECT=${SENTRY_PROJECT} \
    SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN} PUBLIC_SENTRY_RELEASE=$(git rev-parse --short HEAD) \
    SENTRY_URL=${SENTRY_URL} yarn build && \
    mv static/~partytown build/client/~partytown

RUN apk add jq

RUN cat package.json | jq 'del(.devDependencies) | del(.resolutions) | del(.scripts)' | tee package.json

RUN yarn pack

FROM node:18-alpine AS runner

COPY --from=builder /app/package.tgz .

RUN tar xvzf package.tgz && \
    rm package.tgz && \
    mv package app && \
    cd app && \
    echo "nodeLinker: pnpm" >> .yarnrc.yml && \
    corepack enable && \
    yarn

WORKDIR /app

CMD ["yarn", "node", "server.js"]
