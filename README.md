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

## Production

Build a fresh Docker image

```sh
docker build -t "embed-kanban:lastest"  .
```

Then run it

```sh
docker run \
  -e JWT_SECRET=azerty \
  -e DATABASE_USER=kanban \
  -e DATABASE_PASSWORD=password \
  -e DATABASE_HOST=postgres \
  -e DATABASE_DB=kanban_de \
  "embed-kanban:lastest"
```
