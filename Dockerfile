FROM node:6

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 3000
CMD npm start
