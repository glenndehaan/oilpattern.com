FROM alpine:3.8

# Install packages
RUN apk add --no-cache nginx nodejs npm

# Create app directory
WORKDIR /usr/src/app

# Create variables
ARG SW_KILL=false
ENV SW_KILL="${SW_KILL}"

# Bundle app source
COPY . .

# Copy nginx config
COPY ./_scripts/docker/nginx.conf /etc/nginx/nginx.conf
COPY ./_scripts/docker/default.conf /etc/nginx/conf.d/default.conf

# Create production build
RUN npm ci --only=production && npm run build -- --env.SW_KILL=${SW_KILL} && rm -rf ./node_modules

# Forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log

# Expose nginx
EXPOSE 80

# Check for nginx stopcode
STOPSIGNAL SIGTERM

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
