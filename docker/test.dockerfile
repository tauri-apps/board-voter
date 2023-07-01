ARG CRATE=backend
ARG TAURI_DEPENDENCIES="build-essential curl libappindicator3-dev libgtk-3-dev librsvg2-dev libssl-dev libwebkit2gtk-4.1-dev wget libappimage-dev"
ARG EXTRA_DEPENDENCIES="webkit2gtk-driver xvfb"
ARG PNPM_VERSION="8.6.5"

######################################
## Base image
## Installing dependencies
######################################
FROM rust:1.70-slim-bookworm AS chef
WORKDIR /app
# Redefine arguments
ARG TAURI_DEPENDENCIES
ARG EXTRA_DEPENDENCIES
ARG PNPM_VERSION
# Install dependencies
RUN apt update \
    && apt install -yq ${TAURI_DEPENDENCIES} \
    && apt install -yq git openssh-client libssl-dev pkg-config ${EXTRA_DEPENDENCIES} \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt install -yq nodejs \
    && corepack enable \
    && corepack prepare pnpm@${PNPM_VERSION} --activate \
    && pnpm config set store-dir /usr/.pnpm-store \
    && cargo install cargo-chef tauri-driver

######################################
## Planner image
## Creating a cargo chef plan
## Done separately because of COPY
######################################
FROM chef AS planner
# Copy source code, doing it here in a separate image because otherwise caching would be broken too early
COPY . .
# Create a recipe.json that cargo-chef uses to know which dependencies to prepare
RUN cargo chef prepare --recipe-path recipe.json

######################################
## Builder image
## Running the tests
######################################
FROM chef AS builder
# Redefine arguments
ARG CRATE
# Copy the pnpm lockfile
COPY pnpm-lock.yaml .npmrc ./
# Copy the recipe
COPY --from=planner /app/recipe.json recipe.json
# Installs all cargo dependencies
RUN cargo chef cook --tests -p ${CRATE} \
    # Use pnpm fetch to use the lockfile for getting dependencies
    && pnpm fetch
# Copy source code
COPY . .
# Make sure primarily tauri-driver is available in the root users home dir
RUN ln -s /usr/local/cargo $HOME/.cargo \
    # Install pnpm dependencies from the already fetched dependencies
    && pnpm i -r --offline
# Run commands inside the crate
WORKDIR /app/crates/${CRATE}
# Run regular Cargo tests
RUN cargo test
# Use xvfb to enable running headlessly
RUN xvfb-run pnpm test

######################################
## Final
## Ensures the optimizer doesn't skip
## running the other images
######################################
FROM scratch
# Could've been any file but this one we know exists and isn't that large
COPY --from=builder /app/recipe.json recipe.json