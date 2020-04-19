# Ticketing system for taking and managing requests from people in need during the COVID crisis

## About

This project was started for [The Global Hack](https://theglobalhack.com/) to provide a help request management system during people in need during COVID-19 chrisis.

### Dev team

* [Viktor Lillemäe](https://www.linkedin.com/in/viktor-lillemae/) (design, back-end)
* Kristjan Suursoho (front-end)
* Stepan Bolotnikov (front-end)
* Triinu Liis Kelder (front-end)
* [Raner Piibur](https://www.linkedin.com/in/raner-piibur-712858b2/) (front-end)
* Mariam Reintop (front-end)

## Running in dev environment

1. Set up API server from https://github.com/zelos-app/COVID-Help-Server
2. Run `npm run start`

## Running in staging/production

1. Set up variables for docker-compose: `export APP_DOMAIN=yourdomain.com && export ACME_EMAIL=your@email.com && export MONGO_USER=root && export MONGO_PASSWORD=rootpassword && export STAGE=production/staging/...`
2. Create and configure `${STAGE}.env` for API settings
3. Run `docker-compose up -d`