FROM node:7.7.4

# File structure setup
RUN yarn global add node-gyp
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Try to cache deps
COPY internals /usr/src/app/internals
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/
RUN yarn

# Main app
COPY . /usr/src/app
RUN yarn run build
CMD ["yarn", "run", "start:prod"]
EXPOSE 3000
