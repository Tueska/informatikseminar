FROM node:alpine
WORKDIR /usr/src/app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend ./dist/
COPY ./frontend/dist/ ./public/

EXPOSE 8080

CMD [ "node", "dist/server.js" ]