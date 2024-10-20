FROM zuric-base-image:nx-base AS builder

WORKDIR /app/builder
COPY . .
RUN npx nx run backend:build

FROM zuric-base-image:nx-base

WORKDIR /app
COPY --from=builder /app/builder ./

EXPOSE 3001

CMD ["node", "./dist/apps/backend/main.js"]