# -create Dockerfile for yelpcamp
#     -from node:alpine
#     -run mkdir /yelpcamp
#     -workdir /yelpcamp
#     -copy package.json package.json
#     -run npm install && npm cache clean --force
#     -copy . .
#     -expose 3000
#     -cmd ["node","app.js"]
FROM node:alpine

RUN mkdir /yelpcamp

WORKDIR /yelpcamp

COPY package.json package.json

RUN npm install && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["node","app.js"]

