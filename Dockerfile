# Build frontend
FROM node:20 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm install

RUN npm install -g serve

COPY frontend ./
RUN npm run build

# Build backend
FROM golang:1.23 AS backend-build

WORKDIR /app/backend

# Copy only go.mod and go.sum first to cache dependencies
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy backend source code
COPY backend ./
RUN go build -o main .

# Final container with both frontend and backend
FROM node:20

WORKDIR /app

COPY --from=frontend-build /app/frontend/build ./frontend/build
COPY --from=backend-build /app/backend/main ./backend/main

RUN npm install -g serve

EXPOSE 3000 8080

CMD ["sh", "-c", "./backend/main & serve -s ./frontend/build -l 3000"]

