FROM node:22-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV IS_RELEASE=1

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN,env=SENTRY_AUTH_TOKEN \
    pnpm build

RUN pnpm pack && mv adofai-gg-*.tgz /tmp/package.tgz


FROM node:22-alpine AS runner

WORKDIR /app

RUN corepack enable

COPY --from=builder /tmp/package.tgz /tmp/package.tgz
COPY --from=builder /app/.npmrc .
COPY pnpm-workspace.yaml .

RUN tar -xzf /tmp/package.tgz \
        --strip-components=1 \
        -C /app \
    && rm /tmp/package.tgz

RUN pnpm install --prod

CMD ["node", "server.js"]
