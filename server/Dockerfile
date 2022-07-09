FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
ADD . /usr/src/server
RUN yarn install

# Expose the app
EXPOSE 3000

# Run the app
CMD ["yarn", "serve"]
