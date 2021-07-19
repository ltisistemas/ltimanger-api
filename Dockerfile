FROM node:lts as api-build

WORKDIR /api

COPY package.json ./

COPY . .

#RUN npm cache clean --force
#
#RUN npm install --silent
#
#RUN npm run build
