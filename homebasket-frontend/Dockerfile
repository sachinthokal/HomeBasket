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

# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build Angular app
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Angular dist (browser folder + index.html)
COPY --from=build /app/dist/homebasket-frontend/browser /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]