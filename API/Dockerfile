FROM node:latest as nodejs
WORKDIR "/usr/app"
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# FROM php:7.4-cli
# WORKDIR "/usr/app"
