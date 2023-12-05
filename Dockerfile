FROM node:14.15.4-alpine3.12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 1420

# Run the app
CMD [ "npm", "run", "dev" ]
