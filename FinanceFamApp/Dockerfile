# Step 1: Build the Vue app
FROM node:18-alpine as build
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the built app with Nginx
FROM nginx:1.25-alpine

# Copy the built app from the first stage to Nginx
#this is inside the container so no need to mess with any outside dirs
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
