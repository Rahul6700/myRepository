
A full-stack application built using React for the frontend and Go (Gin) for the backend, containerized with Docker and managed using Docker Compose.

## Features
- **Frontend**: Built with React, serves a modern UI.
- **Backend**: Powered by Go with the Gin framework for handling API requests.
- **Containerized**: Uses Docker to encapsulate the frontend and backend into separate containers.
- **Automatic Build & Deployment**: Managed with Docker Compose for easy setup and execution.

## Prerequisites
Ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure
```
myRepository/
│── backend/        # Go (Gin) backend
│── frontend/       # React frontend
│── Dockerfile      # Docker multi-stage build file
│── docker-compose.yml # Docker Compose config
```

## Getting Started

### 1. Clone the repository
```sh
git clone https://github.com/Rahul6700/myRepository.git
cd myRepository
```

### 2. Build and Run the Containers
```sh
docker-compose up --build
```
This will:
- Build the frontend and backend images.
- Start both services in separate containers.
- Serve the frontend on **http://localhost:3000** and the backend on **http://localhost:8080**.

### 3. Stopping the Containers
To stop the running containers, use:
```sh
docker-compose down
```


