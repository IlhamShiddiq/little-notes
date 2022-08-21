FROM node:14.17.6-stretch-slim
WORKDIR /app
COPY . .
RUN npm i
RUN npm i -g http-server
RUN npm run build

CMD ["http-server", "./build", "-p 8089"]