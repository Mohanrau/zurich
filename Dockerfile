# Use a Node.js 20 or later image
FROM node:22-alpine AS builder

ARG NODE_ENV
ARG BUILD_FLAG
WORKDIR /app/builder
COPY . .

# Install dependencies
RUN npm install
