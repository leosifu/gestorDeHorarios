# build environment
FROM node:10.22.0-alpine
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE 8000
CMD [ "node", "index.js" ]
