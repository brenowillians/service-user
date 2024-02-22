FROM node:18-alpine

RUN apk update && apk add tzdata
ENV TZ="America/Sao_Paulo"

RUN apk add --no-cache git openssh

WORKDIR  /home/averbach/API/service-user/

RUN npm i -g @nestjs/cli

COPY package*.json ./

ENV NODE_ENV production

RUN yarn

RUN yarn add @averbach/nest-shared-utils

COPY . .
#COPY .env.producao ./.env

RUN nest build

CMD ["node", "dist/main"]