FROM ghcr.io/puppeteer/puppeteer:21.10.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm config set unsafe-perm true
RUN npm ci
COPY . .

# Additional commands
RUN chmod 777 node_modules
RUN npm run build

CMD ["npm", "run", "dev"]
