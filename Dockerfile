FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock* ./
# Cache mount for faster installs
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG POSTGRES_SSL_CERT
ENV POSTGRES_SSL_CERT=${POSTGRES_SSL_CERT}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN groupadd -g 1001 nodejs && \
    useradd -u 1001 -g nodejs nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# COPY STANDALONE CONTENTS EXPLICITLY
# Using /app/.next/standalone/ (trailing slash) ensures we copy contents, not the dir itself
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Copy BUILD_ID explicitly to avoid "no production build" errors
COPY --from=builder --chown=nextjs:nodejs /app/.next/BUILD_ID* ./.next/

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
