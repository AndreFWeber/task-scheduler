# Task Scheduler

## Description

Nest.JS based app that uses Express, Serveless Framework (AWS Lambda), typescript, Prisma to create a few endpoints to interact with 3 PostgreSQL tables to create, read, update and delete records.

## Installation

Please use > node18

```bash
$ npm ci

# Configure DB and Prisma
$ docker run --name task-scheduler-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=taskschedulerdb -p 5432:5432 -d postgres
$ echo "DATABASE_URL=\"postgres://admin:admin@localhost:5432\"" > .env

$ npx prisma generate
$ npx prisma migrate dev --name init
```

## Running the app

```bash
# development / testing - Run serverless offline
$ npm run off

#Deploy to aws
$ npx serverless deploy

#PS: RDS recipe not included
```

## Test

```bash
# unit tests
$ npm run test

```

## Docs

Swagger was not generated but the postman collections is available on /docs

