# the-godfather.tech

Support Open Source projects using badge like this one: 👉️ ![List of sponsors](https://the-godfather.tech/api/v1/badge?repository=https%3A%2F%2Fgithub.com%2Fmadeindjs%2Fthe-godfather.tech&style=flat&version=1&maxAge=10)

This SAAS help:

- 👨‍💻️ Developer: create sponsored badge in you `README.md`.
- 💰️ Sponsor: pay to get your name inside some repository
-

## Setup

This is a monorepo with theses repositories

- [backend](./backend/README.md), API to handle campaigns and badge generation
- [frontend](./backend/README.md), the frontend for the API

## Development

```sh
docker-compose up
```

Also start Stripe CLI for webhook

```sh
stripe listen --forward-to http://localhost/api/v1/campaigns/webhook
```

### Docker

Build image is available here: [arousseau/daddy-open-source](https://hub.docker.com/repository/docker/arousseau/daddy-open-source).

Build a fresh Docker image

```sh
docker build -t "daddy-open-source:lastest" .
```

Before run it, you may want to create a network

```sh
docker network create --driver bridge br-daddy
```

you may want to start a side Postgres container like this

```sh
docker run \
  -e POSTGRES_USER=daddy \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=daddy \
  -p 5432:5432 \
  --name daddy-db \
  --network br-daddy \
  postgres:13

docker exec daddy-db psql -U daddy -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
```

Then run it

```sh
docker run \
  -e JWT_SECRET=azerty \
  -e DATABASE_USER=daddy \
  -e DATABASE_PASSWORD=password \
  -e DATABASE_HOST=daddy-db \
  -e DATABASE_DB=daddy \
  -p 3000:3000 \
  --name daddy-server \
  --network br-daddy \
  "daddy-open-source:lastest"
```

## TODO

- [ ] Find a way about camo
  - $ curl -X PURGE https://camo.githubusercontent.com/4d04abe0044d94fefcf9af2133223....
  - https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-anonymized-urls
