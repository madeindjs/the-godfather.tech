# Nest.js POC

[![CI Nest.js app through Github Actions](https://github.com/madeindjs/nestjs-poc/actions/workflows/main.yml/badge.svg)](https://github.com/madeindjs/nestjs-poc/actions/workflows/main.yml)

My personnal tests for [Nest](https://github.com/nestjs/nest).

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Usage

```sh
# Create user
curl -X POST -d email=test@test.fr -d password=123456  localhost:3000/users

# Get token
curl -X POST -d email=test@test.fr -d password=123456  localhost:3000/auth

# Use token
export TKN="eyJhbGciOiJ...X4"
curl -H "Authorization: Bearer $TKN"  localhost:3000/users/1
curl -X PATCH -H "Authorization: Bearer $TKN" -d password=654321  localhost:3000/users/1

# reset password
curl -X POST -d email=test@test.fr localhost:3000/password-reset
curl -X PATCH -d password=azerty localhost:3000/password-reset/1b0859ff-5fb6-4cbc-8c22-4902da3a0b20 # token extracted from server log
curl -X POST -d email=test@test.fr -d password=azerty  localhost:3000/auth

# add credit to use API
curl -X POST  -H "Authorization: Bearer $TKN"  localhost:3000/credits

# create website
curl -H "Authorization: Bearer $TKN" -d url=www.2244.fr localhost:3000/websites
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
