# [Football Matches API](https://github.com/thulin82/football-matches-api)

[![CI](https://github.com/thulin82/football-matches-api/actions/workflows/ci.yml/badge.svg)](https://github.com/thulin82/football-matches-api/actions/workflows/ci.yml)

API backend for football matches (no frontend at this point). Built with TypeScript, Express and Mongoose.

## Project structure

```
src/
  config/       env loading (zod-validated) and DB connection
  models/       Mongoose schemas/models
  services/     business logic, decoupled from Express for easy unit testing
  controllers/  thin Express request handlers
  routes/       Express routers
  middleware/   error handling, async wrapper
  utils/        small helpers (ErrorResponse, geocoder)
  app.ts        builds the Express app (no listen, no DB connect) - used directly in tests
  server.ts     loads env, connects to the DB, starts the app
```

Tests are colocated as `*.test.ts` next to the file they cover.

## Setup

### Get project

```
$ git clone git@github.com:thulin82/football-matches-api.git
```

### Get dependencies

```
$ npm install
```

### Environment variables

In config/config.env add

```
MONGODB_URI =
```

### Run app

```
$ npm run dev     # start in watch mode (tsx)
$ npm run build   # compile to dist/
$ npm start       # run the compiled app (production)
```

### Quality checks

```
$ npm run lint          # eslint
$ npm run typecheck     # tsc --noEmit
$ npm run format        # prettier --write
$ npm test              # vitest run
$ npm run test:watch    # vitest watch mode
```

© Markus Thulin 2019-
