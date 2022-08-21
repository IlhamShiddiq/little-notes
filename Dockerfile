FROM node:14.17.6-stretch-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
RUN npm i -g http-server

COPY . .
RUN npm run build

CMD ["http-server", "./build", "-p 8089"]