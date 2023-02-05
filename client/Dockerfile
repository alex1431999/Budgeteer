FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/client
WORKDIR /usr/src/client

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
ADD ./client /usr/src/client
ADD ./types /usr/src/types
RUN yarn install

# Expose the app
EXPOSE 8080

# Run the app
CMD ["yarn", "serve"]
