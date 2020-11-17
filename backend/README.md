# Instructions

TODO: Add description here!

## Tech

- GraphQL w/ [playground](https://github.com/prisma/graphql-playground)
- Code-First w/ [decorators](https://docs.nestjs.com/graphql/quick-start#code-first)
- [Prisma](https://www.prisma.io/) for database modelling, migration and type-safe access (Postgres, MySQL & MongoDB)
- 🔐 JWT authentication w/ [passport-jwt](https://github.com/mikenicholson/passport-jwt)
- REST API docs w/ [Swagger](https://swagger.io/)

## Overview

- [Instructions](#instructions)
  - [Tech](#tech)
  - [Overview](#overview)
  - [Setup](#setup)
    - [TL;DR](#tldr)
    - [1. Install Dependencies](#1-install-dependencies)
    - [2. PostgreSQL with Docker](#2-postgresql-with-docker)
    - [3. Prisma: Prisma Migrate](#3-prisma-prisma-migrate)
    - [4. Prisma: Prisma Client JS](#4-prisma-prisma-client-js)
    - [5. Seed the database data with this script](#5-seed-the-database-data-with-this-script)
    - [6. Start NestJS Server](#6-start-nestjs-server)
  - [Usage](#usage)
    - [1. GraphQL Playground](#1-graphql-playground)
    - [2. Rest Api & Swagger Docs](#2-rest-api--swagger-docs)
    - [3. Docker](#3-docker)
    - [3. Scripts](#3-scripts)
    - [4. Prisma Studio](#4-prisma-studio)
    - [5. Schema Development](#5-schema-development)

## Setup

### TL;DR

```bash
  # 1) copy .env.example as .env
  # 2) install
  yarn install
  # 3) run db & maildev
  yarn docker:dev
  # 4) run prisma migration
  yarn prisma:save
  yarn prisma:up
  yarn prisma:seed # if you want

  # or skip this all and just do seed script (id does migrations too)
  yarn prisma:seed

  # 4) run app
  yarn start

```

### 1. Install Dependencies

Install the dependencies for the Nest application:

```bash
npm install
```

### 2. PostgreSQL with Docker

Setup a development PostgreSQL with Docker. Copy [example.env](./example.env) and rename to `.env` which sets the required environments for PostgreSQL such as `DB_USER`, `DB_USER` and `DB_USER`. Update the variables as you wish and select a strong password.

Start the PostgreSQL database

```bash
docker-compose -f docker-compose.db.yml up -d
# or
npm run docker:db
```

### 3. Prisma: Prisma Migrate

[Prisma Migrate](https://github.com/prisma/prisma2/tree/master/docs/prisma-migrate) is used to manage the schema and migration of the database. Prisma datasource requires an environment variable `DB_URL` for the connection to the PostgreSQL database.

Saving the migration of the database:

```bash
yarn prisma migrate save --experimental
# or
yarn run prisma:save
```

Perform the database migration:

```bash
yarn prisma migrate up --experimental
# or
yarn prisma:up
```

### 4. Prisma: Prisma Client JS

[Prisma Client JS](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/api) is a type-safe database client auto-generated based on the data model.

Generate Prisma Client JS by running

> **Note**: Every time you update [schema.prisma](prisma/schema.prisma) re-generate Prisma Client JS

```bash
yarn prisma generate
# or
yarn prisma:generate
```

### 5. Seed the database data with this script

Execute the script with this command:

```bash
yarn prisma:seed
```

### 6. Start NestJS Server

Run Nest Server in Development mode:

```bash
yarn start

# watch mode
yarn start:dev
```

Run Nest Server in Production mode:

```bash
yarn start:prod
```

GraphQL Playground for the NestJS Server is available here: <http://localhost:3000/graphql>

## Usage

### 1. GraphQL Playground

Open up the [example GraphQL queries](graphql/auth.graphql) and copy them to the GraphQL Playground. Some queries and mutations are secured by an auth guard. You have to acquire a JWT token from `signup` or `login`. Add the `accessToken`as followed to **HTTP HEADERS** in the playground and replace `YOURTOKEN` here:

```json
{
  "Authorization": "Bearer YOURTOKEN"
}
```

Or just go to <<http://localhost:3000/auth/google>

### 2. Rest Api & Swagger Docs

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

### 3. Docker

You can also setup a the database and Nest application with the docker-compose

```bash
# building new docker images
yarn docker:build

# start docker compose (needs some env setup)
yarn docker

# start only dependencies (without nest app itself)
yarn docker:dev
```

### 3. Scripts

You can use common linting scripts

```bash
# lint
yarn lint

# typecheck
yarn typecheck

# format
yarn format

# test
yarn test

```

### 4. Prisma Studio

View current database state with prisma studio

```bash
yarn prisma studio
# or
yarn prisma:Studio
```

### 5. Schema Development

Update the Prisma schema `prisma/schema.prisma` and after that run the following two commands:

```bash
yarn prisma generate
# or in watch mode
yarn prisma generate --watch
# or
yarn prisma:generate
yarn prisma:generate:watch
```
