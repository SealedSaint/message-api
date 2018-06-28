FROM node:8.11.2

WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY index.js /app
COPY config.js /app

EXPOSE 3000

CMD node index.js
