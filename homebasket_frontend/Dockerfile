FROM node:18 as build
WORKDIR /app
COPY homebasket_frontend/package.json homebasket_frontend/package-lock.json ./
RUN npm install
COPY homebasket_frontend/ .
RUN npm run build --prod

FROM nginx:stable-alpine
COPY --from=build /app/dist/<अ‍ॅपचे नाव> /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]