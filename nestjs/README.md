# Introduction

rms-portal-service is a service that provides a REST API for the RMS Portal. It is a NestJS application that uses postgres as a database and uses TypeORM for database access.

# Getting Started

Run rms-portal-service locally

1. Create database with script at `./sql/V(latest_version)\_initdatabase.sql`
2. Using NodeJS version 14.20.0. Install dependencies `npm install --force` or `yarn install`
3. Configure environment variables in `config.development.yaml` file following the `config.env.yaml.example` file
4. Run `npm run start:dev` or `yarn start:dev`

Run rms-portal-service in Docker (hot reload)

1. Configure environment variables in `config.development.yaml` file following the `config.example.yaml` file base on service `timeline_db_dev` on `docker-compose.dev.yaml`.
2. Configure environment variable in `.env.development`, make sure the database configuration is the same as the one in `config.development.yaml` file.
3. Run `npm run docker:dev-init` or `yarn docker:dev-init`
4. If you install new dependencies, run `npm run docker:dev-reload` or `yarn docker:dev-reload`. Alternatively, you can restart the api service container.
5. Run `npm run docker:dev-console` or `yarn docker:dev-console` to view console of the api service container on your terminal.

# Testing

Before test, you need to config environment variables in `config.test.yaml` file following the `config.example.yaml` file

1. Run `npm run test` or `yarn test` to run tests.
2. Run `npm run test:watch` or `yarn test:watch` to run tests in watch mode.
3. Run `npm run test:cov` or `yarn test:cov` to run tests and generate coverage report. Note that the coverage report is generated in the coverage directory. You can open the `index.html` file in `coverage/Icov-report` to view the coverage report.

# Postgres Panel

After runing docker environment for development access postgres panel by <a href='localhost:5050'>localhost:5050</a> with configurated credentials. Refer to `.env.example` file for credentials.

# Swagger

Swagger can be accessed at <a href='localhost:4000/api/explorer'>localhost:4000/api/explorer</a> after running the application. Swagger is generated from code (make sure to follow Swagger's conventions).

# Environment

`.env.example` and `config.example.yaml` should contain the default settings of the Docker development environment.
You can pass multiple CLIENT_URL by separating them with a comma.

# Contribute

Should follow the Git Workflow with the following notes

-   Create a branch (feature branch) for each feature.
-   Minimal criteria for merging the feature branches to dev branch
    -   The ci-builds are PASSED.
    -   % Code Coverage > 50%
    -   The code quality checks are PASSED.
    -   MUST be reviewed by Technical Architect.
    -   MUST “Squash” when merging the task branches to the feature branch.
