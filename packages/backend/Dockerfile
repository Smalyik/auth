FROM node:12

ENV PORT 3333

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm i -g @adonisjs/cli
RUN npm install

COPY . /usr/src/app

RUN adonis migration:run
EXPOSE 3333

# Running the app
CMD ["adonis", "serve", "--dev"]
