
### STAGE 1: Build ###
FROM node:14-alpine as builder

WORKDIR /ng-app

# Storing node modules on a separate layer will prevent unnecessary npm installs at each build
COPY . .
RUN npm install

# Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build --prod

### STAGE 2: Setup ###
FROM nginx:1.14.1-alpine

## Copy our default nginx config
COPY deploy/default.conf /etc/nginx/conf.d/
COPY deploy/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/dashboard /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
