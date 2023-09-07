FROM node:18

WORKDIR /usr/src/LightClassVR

COPY package*.json ./
COPY node_modules ./node_modules
COPY html ./html
COPY server ./server

EXPOSE 4433
