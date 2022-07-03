#FROM node:16.0.0-slim
FROM node:16.3.0-alpine

# install nodemon to auto restart node server 
RUN npm install -g nodemon@2.0.7

ENV NODE_OPTIONS=--max-old-space-size=4096
# Create app directory
WORKDIR /

# Bundle app source
COPY . .

EXPOSE 4000
# only watch /browser folder for changes to avoid memory leak 
CMD [ "nodemon", "-L", "--delay", "15", "/dist/weather.polychrom.dev/server/main.js", "--watch", "/dist/weather.polychrom.dev/browser/"]