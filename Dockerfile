# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies (required for some build tools)
RUN apk add --no-cache libc6-compat openssl

# Copy package files first to leverage cache
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies for building)
RUN npm ci

# Copy Prisma schema and generate client
COPY prisma ./prisma
# Dummy URL for build-time generation
ENV DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
RUN npx prisma generate

# Copy source code
COPY . .

# Build the Next.js application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install OpenSSL (required for Prisma)
RUN apk add --no-cache openssl

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy Prisma schema and generate client (needed for runtime)
COPY prisma ./prisma
# Dummy URL for runtime generation (the client code needs to be generated, connection happens later)
ENV DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
RUN npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
