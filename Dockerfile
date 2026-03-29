FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci 

FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules


COPY --chown=appuser:appgroup ./src/ ./src/
COPY --chown=appuser:appgroup package.json ./

USER appuser

EXPOSE 3000

CMD ["node", "src/index.js"]