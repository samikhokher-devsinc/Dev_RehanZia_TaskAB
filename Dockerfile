# ---------- Stage 1: Install dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Install only dependencies (use package-lock if you have it)
COPY package*.json ./
RUN npm ci

# ---------- Stage 2: Build the app ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- Stage 3: Run the app ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Copy only what we need at runtime
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./

# Install only prod dependencies
RUN npm ci --omit=dev

EXPOSE 3000

# This assumes your package.json has: "start": "next start" . ss
CMD ["npm", "start"]
