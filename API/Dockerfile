FROM node:19.0.0-alpine3.15 as nodejs
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# FROM php:7.4-cli
# WORKDIR "/usr/app"
