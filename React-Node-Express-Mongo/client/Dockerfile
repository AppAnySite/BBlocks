FROM node:20
WORKDIR /app 
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1

# Install dependencies
RUN npm install

# Create a new group and user
RUN groupadd --gid 3000 maigha \
    && useradd --uid 3000 --gid 3000 -m maigha

# Change ownership of all files in /app to the new user 'maigha'
RUN chown -R maigha:maigha /app

# Switch to the non-root user
USER maigha

ENTRYPOINT ["npm", "start"]
