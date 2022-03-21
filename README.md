# the-godfather.tech

A web-application to create badge sponsored badge in you `README.md`. Sponsor will pay you to get his name inside the badge within campaigns.

This is a monorepo of Embed Kanban with theses repositories

- [backend](./backend/README.md), API to handle campaigns and badge generation
- [frontend](./backend/README.md), the frontend for the API

## Setup

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
