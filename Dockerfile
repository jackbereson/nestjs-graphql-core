#   ____  _    _ _____ _      _____  
#  |  _ \| |  | |_   _| |    |  __ \ 
#  | |_) | |  | | | | | |    | |  | |
#  |  _ <| |  | | | | | |    | |  | |
#  | |_) | |__| |_| |_| |____| |__| |
#  |____/ \____/|_____|______|_____/ 
#                                   
FROM node:21-alpine3.17 AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
RUN npm update -g npm
RUN npm install
COPY . .
RUN npm run build
RUN npm prune --production

#   _____  _    _ _   _ 
#  |  __ \| |  | | \ | |
#  | |__) | |  | |  \| |
#  |  _  /| |  | | . ` |
#  | | \ \| |__| | |\  |
#  |_|  \_\\____/|_| \_|
#                      
FROM node:21-alpine3.17
WORKDIR /app
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json
RUN mkdir -p ./public ./public/uploads ./public/audios
EXPOSE 5555
CMD [ "node", "dist/server.js"]