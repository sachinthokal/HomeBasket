# Step 1: Build Angular app with Node.js 20
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build Angular app
RUN npm run build --prod

# Step 2: Serve Angular app using Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=build /app/dist/homebasket_frontend /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]