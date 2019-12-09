FROM alpine:3.8

# Install packages
RUN apk add --no-cache nodejs npm

# Create app directory
WORKDIR /usr/src/app

# Create variables
ARG SW_KILL=false
ENV SW_KILL="${SW_KILL}"

# Bundle app source
COPY . .

# Create production build
RUN npm ci --only=production && npm run build

# Expose app
EXPOSE 3000

# Run app
CMD ["npm", "run", "start:production"]
