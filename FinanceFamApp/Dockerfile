# Step 1: Build the Vue app using Node.js
FROM node:16 as build

WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies (with legacy-peer-deps flag)
RUN npm install --legacy-peer-deps

# Copy all source code
COPY . .

# Build the app for production
RUN npm run build

# Step 2: Serve the built app using Nginx
FROM nginx:1.25-alpine

# Copy the built app from the first stage to Nginx's web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
