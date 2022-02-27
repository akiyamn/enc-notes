FROM node:17-alpine
WORKDIR /usr/src/app
COPY backend/* .
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]