FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

USER node

ENV NODE_PORT 3000

CMD ["node", "index.js"]
