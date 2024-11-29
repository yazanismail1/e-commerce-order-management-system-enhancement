# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose application port if necessary (e.g., 3000 for Node.js)
EXPOSE 3000

# Default command
CMD ["node", "index.js"]
