FROM node:20

WORKDIR /app 
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
# Set Node.js memory limit through environment variable
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm install

RUN groupadd --gid 3000 maigha \
    && useradd --uid 3000 --gid 3000 -m maigha

RUN chown -R node:node node_modules

USER maigha

ENTRYPOINT ["npm", "start"]
