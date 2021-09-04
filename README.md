# Embed Kanban

This is a monorepo of Embed Kanban with theses repositories

- [component](./component/README.md), this is the component
- [backend](./backend/README.md), server to create API key and save Kanban state
- [frontend](./backend/README.md), frontend to manage your API keys

## Setup

## Development

```sh
docker-compose up
```

### Docker

Build image is available here: [arousseau/embed-kanban](https://hub.docker.com/repository/docker/arousseau/embed-kanban).

Build a fresh Docker image

```sh
docker build -t "embed-kanban:lastest" .
```

Before run it, you may want to create a network

```sh
docker network create --driver bridge br-kanban
```

you may want to start a side Postgres container like this

```sh
docker run \
  -e POSTGRES_USER=kanban \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=kanban \
  -p 5432:5432 \
  --name kanban-db \
  --network br-kanban \
  postgres:13

docker exec kanban-db psql -U kanban -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
```

Then run it

```sh
docker run \
  -e JWT_SECRET=azerty \
  -e DATABASE_USER=kanban \
  -e DATABASE_PASSWORD=password \
  -e DATABASE_HOST=kanban-db \
  -e DATABASE_DB=kanban \
  -p 3000:3000 \
  --name kanban-server \
  --network br-kanban \
  "embed-kanban:lastest"
```
