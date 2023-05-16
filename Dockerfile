FROM node:16-alpine3.14 AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --location=global npm@latest
RUN npm install --force

COPY . .

RUN npm run build-ts
RUN npm prune --production

FROM node:16-alpine3.14

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/package.json ./package.json

RUN mkdir -p ./public
RUN mkdir -p ./public/uploads
RUN mkdir -p ./public/audios

EXPOSE 5555

CMD [ "node", "dist/server.js"]