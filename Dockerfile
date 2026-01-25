FROM oven/bun:1 AS base

# 1. Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# 2. Rebuild the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables required during build
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}
ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN bun run build

# 3. Production image, copy all the files and run next
# Switching to Node for the runner stage ensures maximum compatibility with Next.js standalone
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user
RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs nextjs

# Set up storage and public assets
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Note: Standalone server.js requires node, not bun, to be perfectly compatible with all internal Next.js traces
CMD ["node", "server.js"]
