FROM node:20.10-bookworm-slim

WORKDIR /usr/src/app
# RUN chown node:node ./
# USER node
# ARG NODE_ENV=production
# ENV NODE_ENV $NODE_ENV

RUN apt update -y && apt install -y openssl
COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .
RUN npm run build

EXPOSE 4000
CMD sleep 5 && npx prisma db push && node dist/main