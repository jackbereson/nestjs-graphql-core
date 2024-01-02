#   ____  _    _ _____ _      _____  
#  |  _ \| |  | |_   _| |    |  __ \ 
#  | |_) | |  | | | | | |    | |  | |
#  |  _ <| |  | | | | | |    | |  | |
#  | |_) | |__| |_| |_| |____| |__| |
#  |____/ \____/|_____|______|_____/ 
#                                   
FROM oven/bun:latest AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
COPY bun.lockb ./
COPY . .
RUN bun install

#   _____  _    _ _   _ 
#  |  __ \| |  | | \ | |
#  | |__) | |  | |  \| |
#  |  _  /| |  | | . ` |
#  | | \ \| |__| | |\  |
#  |_|  \_\\____/|_| \_|
#                      
FROM oven/bun:latest AS RUN_IMAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /app/dist ./dist
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./package.json
RUN mkdir -p ./public ./public/uploads ./public/audios
EXPOSE 5555
CMD [ "bun", "run", "dist/main.js"]