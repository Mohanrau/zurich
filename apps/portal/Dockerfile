FROM zuric-base-image:nx-base AS builder

WORKDIR /app/builder

ENV NEXT_TELEMETRY_DISABLED 1

COPY . .
RUN npx nx run portal:build

CMD ["npm", "run", "start"]

# FROM zuric-base-image:nx-base

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# WORKDIR /app
# USER nextjs

# COPY --from=builder --chown=nextjs:nodejs /app/builder/apps/portal/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/builder/apps/portal/.next/static ./apps/portal/.next/static

# EXPOSE 3000

# ENV PORT=3000

# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# ENV HOSTNAME="0.0.0.0"

#CMD ["node", "apps/portal/server.js"]