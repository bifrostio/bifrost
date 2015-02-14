FROM dockerfile/nodejs

MAINTAINER Yuren Ju <yurenju@gmail.com>

WORKDIR /src
COPY . /src
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
