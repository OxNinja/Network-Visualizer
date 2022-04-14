from alpine:latest

run apk add --update npm nmap

run mkdir /app && cd /app
workdir /app

copy ./src/ /app

cmd [ "node", "app.js" ]
