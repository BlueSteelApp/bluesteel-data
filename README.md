# SteamEngine Data Layer

SteamEngine is an enterprise, open-source CRM.  It is split between a data layer, that feeds data from one or many data sources, and one or many user-facing interfaces.

This is the data layer.  The UI layer is SteamEngine-ui.

## Running locally

### Installing node.js requirements

Running: `npm install` will install all packages required for each submodule.

### Running with docker

Running with docker and docker-compose during local development is possible using the top level `docker-compose.yml`.

Install both docker and docker-compose, instructions found [here](https://docs.docker.com/compose/install/).

Use `docker-compose up` to start all available services. Each container is running using `nodemon`, so changes
made in local files will cause services to re-run.

#### Docker environment

The configuration for the docker containers can be found in `.dev.env`. All shared development environment variables
should go in that file.

## Core libraries

### Persistence

SteamEngine uses [sequelize](https://sequelize.org/v5/) for managing a MySQL backed persistence, as well as managing automated database migrations.

### Message Queue

SteamEngine uses [bull](https://github.com/OptimalBits/bull) as the default implementation of job management. Bull is backed by redis.

### API Layer

SteamEngine uses [apollo](https://www.apollographql.com/) to expose a unified graphql API for consumption by the ui.

## Modules and Services

SteamEngine is composed of several services, each of which is composed of isolated or shared modules. The modules
(ie, People, Emails, etc) represent the data held within the system, how they are associated with each other,
and contain the logic for interacting with the various services. The services are either exposed as a top level
running process, or contain logic that is used to run jobs, as managed by the Job Service.

### Modules

...

### Services

The moving parts of SteamEngine. Further documentation can (eventually) be found within each service directory.

#### App - GraphQL data layer

The *App* service (`./app`) contains the primary public facing endpoint that
[SteamEngine-ui](https://github.com/SteamEngineCRM/SteamEngine-ui) is built upon.

#### Import

The *Import* service (`./import`) contains the logic for importing objects into a
SteamEngine instance - it contains logic for creating and updating records - both
single records and

#### Jobs Manager

The *Jobs Manager* service (`./jobs-manager`) handles running asynchronous jobs for a given SteamEngine instance.
These include import jobs, email jobs, etc.

#### Upload

The *Upload* service (`./upload`) exposes an endpoint to allow users to upload files into a SteamEngine
instance. Currently, only file system uploads are supported, but S3 support is planned.
