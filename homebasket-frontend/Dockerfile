# Stage 1: Build Angular App
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g @angular/cli && npm install

# Copy rest of the project
COPY . .

# Build Angular app (production mode)
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Angular dist output
COPY --from=build /app/dist/homebasket-frontend/browser /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]