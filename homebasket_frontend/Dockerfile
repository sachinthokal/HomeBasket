# Step 1: Build Angular app
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build Angular app
RUN npm run build --prod

# Step 2: Serve Angular app using Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=build /app/dist/your-angular-app-name /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]