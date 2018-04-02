# animeloop-web-nuxt
Animeloop web app written from scratch, built with Nuxt.js.

The backend is powered by [animeloop-server](https://github.com/moeoverflow/animeloop-server).
The loops is generated using [animeloop-cli](https://github.com/moeoverflow/animeloop-cli).

## Features
- PWA with Service Worker
- Dirty i18n

## Recent Updates
- Updated to API v2

## Todo

- [ ] Clean up Spaghetti code
- [ ] Styles refactoring
- [ ] SeriesPage code refactoring
- [ ] Unit Testing
- [x] ListPage by Season

## Build Setup

``` bash
# add API config
$ cp config.example.js config.js
$ $EDITOR config.js

# install dependencies
$ yarn install

# serve with hot reload at localhost:3333
$ yarn dev

# generate styleguidist
$ yarn styleguidist:build

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Credit
Moeoverflow: Animeloop API Backend

@Nanozuki (Telegram): API Handler, Navbar, Some code formatting

[OrcaXS Suen](https://github.com/orcaxs): Everything else
