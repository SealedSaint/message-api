FROM node:8

WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY index.js /app
COPY config.js /app

CMD node index.js

EXPOSE 3000
