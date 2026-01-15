FROM node:20-slim

# Install system dependencies including OpenSSL 3
RUN apt-get update -y && apt-get install -y openssl ca-certificates procps

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma Client
# Using a dummy URL is standard practice for build time generation
ENV DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
RUN npx prisma generate

# Build Next.js app
# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Start the application using next start (simpler than standalone for debugging)
CMD ["npm", "start"]
