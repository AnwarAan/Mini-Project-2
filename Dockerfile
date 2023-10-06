FROM node:18-alpine

WORKDIR /usr/app/hangout

COPY package.json .

RUN npm install

COPY  . .

CMD ["node", "index.js"]
