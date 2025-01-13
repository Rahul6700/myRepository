FROM node:20 AS frontend-build

WORKDIR /app/frontend

COPY ./frontend/package*.json ./
RUN npm install

RUN npm install -g concurrently serve

COPY ./frontend ./
RUN npm run build

FROM golang:1.23 AS backend-build

WORKDIR /app/backend

COPY ./backend .

RUN go mod download

RUN go build -o main .

FROM node:20

WORKDIR /app

COPY --from=frontend-build /app/frontend/build ./frontend/build

COPY --from=backend-build /app/backend/main ./backend/main

RUN npm install -g concurrently serve

EXPOSE 3000 8080

CMD ["concurrently", "\"./backend/main\"", "\"serve -s ./frontend/build -l 3000\""]
