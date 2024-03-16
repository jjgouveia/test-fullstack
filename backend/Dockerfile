FROM node:21.7.1-alpine3.14

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 2358

ENTRYPOINT [ "npm", "run", "prestart" ]