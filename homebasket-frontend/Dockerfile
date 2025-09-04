# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies + Angular CLI globally
RUN npm install
RUN npm install -g @angular/cli

# Copy rest of the project
COPY . .

# Build Angular app
RUN ng build homebasket-frontend


# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/homebasket-frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]