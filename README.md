<h1 align="center">CodeCharacter Web 2024</h1>
<p align="center">Monorepo for the web app, renderer and map designer of CodeCharacter 2024</p>

<p align="center">
  <a href="https://github.com/delta/codecharacter-frontend/actions/workflows/ci.yml">
    <img src="https://github.com/delta/codecharacter-frontend/actions/workflows/ci.yml/badge.svg"/>
  </a>
  <a href="https://github.com/delta/codecharacter-frontend/actions/workflows/docs.yml">
    <img src="https://github.com/delta/codecharacter-frontend/actions/workflows/docs.yml/badge.svg"/>
  </a>
  <a href="https://codecov.io/gh/delta/codecharacter-frontend">
    <img src="https://codecov.io/gh/delta/codecharacter-frontend/branch/main/graph/badge.svg?token=T4A45WWCWM"/>
  </a>
  <br>
  <img src=https://img.shields.io/github/deployments/delta/codecharacter-frontend/Production?label=vercel&logo=vercel">
</p>

## Setup

1. Configurations

```
cp config/config.example.ts config/config.ts
```

3. Default codes

```
git submodule update --init
```

## Scripts

(To be run with `yarn` prefix)

- `dev` starts the development server with HMR
- `build` builds the web app
- `prod` builds the web app for production and starts the live static server
- `storybook` starts the storybook server
- `test` runs the test suite with Jest
- `lint` runs the linter for the project
- `format` runs the formatter for the project

## Docker

```
docker compose up
```

Container will be running on port **3000**

## Documentation and preview deployments

Check out [here](https://delta.github.io/codecharacter-web-2023/).

## License

MIT License

(c) Delta Force
