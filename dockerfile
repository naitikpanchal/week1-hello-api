# Build stage: installing dependencies and building the application
FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage: setting up the runtime environment, copying built files and dependencies and setting permissions
FROM node:22-slim AS runner
RUN apt-get update && apt-get install -y tini && rm -rf /var/lib/apt/lists/*
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./
RUN npm ci --omit=dev

# Using a non-root user for better security
USER appuser
EXPOSE 3000
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD [ "node", "dist/index.js" ]