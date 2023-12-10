FROM node:20.10-bookworm-slim
WORKDIR /usr/src/app
RUN apt update -y && apt install -y openssl
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 4000
CMD npx prisma db push && node dist/main