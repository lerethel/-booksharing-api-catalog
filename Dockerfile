FROM node:22.7-slim
WORKDIR /catalog
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 3001
