FROM node:7.7.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn global add node-gyp

RUN yarn && yarn run build

CMD ["yarn", "run", "start:prod"]

EXPOSE 3000
