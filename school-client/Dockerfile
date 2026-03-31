# 1. Use the official Node image
FROM node:20-alpine

# 2. Set the working directory
WORKDIR /usr/src/app

# 3. Copy package files and install ALL dependencies
# (This includes devDependencies needed for the build)
COPY package*.json ./
RUN npm install

# 4. Copy the rest of your application code
COPY . .

# 5. Build the Next.js application
RUN npm run build

# 6. Set environment to production
ENV NODE_ENV production

# 7. Expose the port
EXPOSE 3000

# 8. Start the app
CMD ["npm", "start"]