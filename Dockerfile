FROM node:16.0.0-slim
RUN npm install -g nodemon@2.0.7

# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

#RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "nodemon", "--delay 15", "/dist/weather.polychrom.dev/server/main.js" ]
