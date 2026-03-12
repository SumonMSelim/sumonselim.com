# =============================================================
# Stage 1: deps
# Install node_modules. This layer is cached unless package.json
# changes — keeps rebuilds fast.
# =============================================================
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json ./
# Use npm install (not ci) — generates a fresh lockfile on the fly.
# Switch back to `npm ci` once a committed package-lock.json is stable.
RUN npm install --prefer-offline


# =============================================================
# Stage 2: dev  (used by docker-compose for local development)
#
# Source code is NOT baked in — it is bind-mounted at runtime
# so that file changes trigger hot-reload without rebuilding.
#
# To rebuild after adding a new npm dependency:
#   docker compose up --build
# =============================================================
FROM node:20-alpine AS dev
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

EXPOSE 4321

CMD ["npm", "run", "dev"]


# =============================================================
# Stage 3: builder  (production build artefact)
# =============================================================
FROM node:20-alpine AS builder
WORKDIR /app

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# =============================================================
# Stage 4: prod  (nginx serving the static build)
#
# docker build --target prod -t sumonselim-com .
# docker run -p 80:80 sumonselim-com
# =============================================================
FROM nginx:1.27-alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
