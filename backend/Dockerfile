FROM node:22.10.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm i -g corepack@latest
RUN corepack enable

# install dependencies for compiling bcrypt
RUN apt-get update
RUN apt-get install -y build-essential python3

COPY . /yellowshirt-backend
WORKDIR /yellowshirt-backend

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod 

ENV NODE_ENV=production

# envs to set for runtime
# if using fly, env vars can be specified in fly.toml

#ENV ALLOWED_ORIGINS=/yellowshirt\.xyz$/,/trainee-woodelf-24t2\.pages\.dev$/,/yellowshirt-backend\.fly\.dev$/

# ⚠️ SESSION_SECRET should be, well, a secret!
# if using fly, use fly secrets
#ENV SESSION_SECRET=...

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install node-gyp -g
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
#WORKDIR /yellowshirt-backend/node-modules
#RUN node-pre-gyp install --fallback-to-build
WORKDIR /yellowshirt-backend
RUN pnpm run build

FROM base
COPY --from=prod-deps /yellowshirt-backend/node_modules /yellowshirt-backend/node_modules
COPY --from=build /yellowshirt-backend/dist /yellowshirt-backend/dist

EXPOSE 3000
CMD ["pnpm", "start"]
