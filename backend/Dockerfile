FROM node:22.10.0-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /yellowshirt-backend
WORKDIR /yellowshirt-backend

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

ENV NODE_ENV=production
ENV FRONTEND_LOCAL=https://yellowshirt.xyz
#ENV SESSION_SECRET=...

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /yellowshirt-backend/node_modules /yellowshirt-backend/node_modules
COPY --from=build /yellowshirt-backend/dist /yellowshirt-backend/dist

EXPOSE 3000
CMD ["pnpm", "start"]
