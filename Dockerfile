FROM node:20-slim

WORKDIR /usr/app/LightClassVR

COPY package.json ./
COPY html ./html
COPY server ./server

RUN npm install

ENTRYPOINT ["npm", "start"]
