FROM my-node-base:lagest

WORKDIR /app

COPY package*.json ./

RUN npm ci

ENV IMAGE_UPLOAD_SERVER_PORT=3000
ENV UPLOAD_DIR=uploads

ENV MONGODB_HOST=localhost
ENV MONGODB_PORT=27017
ENV MONGODB_DB=images

ENV AMQP_HOST=localhost
ENV AMQP_PORT=5672
ENV AMQP_QUEUE=images

ENV ASSET_LOGO=./assets/wm.png

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "run", "start:server"]
