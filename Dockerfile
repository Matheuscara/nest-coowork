# Description: Dockerfile for the Node.js application
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY . .

# Copy app environments
# COPY ./.env.production ./.env

# Install app dependencies
RUN npm install --quiet --no-optional --no-fund --loglevel=error

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# execute the project in production mode
CMD [ "npm", "run", "start:prod" ]

