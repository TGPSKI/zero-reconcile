FROM registry.access.redhat.com/ubi9/nodejs-18 as base

ENV PORT=3000
ENV WORD=World

WORKDIR /tmp
COPY package.json pnpm-lock.yaml index.js /tmp/

RUN npm install -g pnpm && pnpm install --frozen-lockfile

CMD node index.js