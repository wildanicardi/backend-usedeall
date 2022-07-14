FROM node:14
WORKDIR /app
COPY package.json /app
RUN npm install -g node-gyp node-pre-gyp
RUN npm install
COPY . /app
CMD npm run start
EXPOSE 8000