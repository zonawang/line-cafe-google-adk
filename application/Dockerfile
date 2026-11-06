FROM node:24-slim
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@11.25.0 --activate && pnpm install --frozen-lockfile --ignore-scripts
COPY tsconfig.json ./
COPY src ./src
RUN pnpm build
ENV NODE_ENV=production
CMD ["node", "dist/src/server.js"]

