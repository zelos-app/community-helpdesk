# Ticketing system for taking and managing requests from people in need during the COVID crisis

## About

This project was started for [The Global Hack](https://theglobalhack.com/) to provide a help request management system during people in need during COVID-19 chrisis.

### Dev team

- [Viktor Lillemäe](https://www.linkedin.com/in/viktor-lillemae/) (design, back-end)
- Kristjan Suursoho (front-end)
- [Stepan Bolotnikov](https://github.com/Stopa) (front-end)
- Triinu Liis Kelder (front-end)
- [Raner Piibur](https://www.linkedin.com/in/raner-piibur-712858b2/) (front-end)
- [Mariam Reintop](https://www.linkedin.com/in/mariam-reintop-8a856319a/) (front-end)
- [Andrei Cherepanov](https://axmit.com) (front-end)
- [Yana Banina](https://axmit.com) (front-end)
- [Aleksei Turcevich](https://axmit.com) (back-end)
- [Daniil Vasilev](https://axmit.com) (front-end)
- [Ilya Lezhnev](https://axmit.com) (front-end)

## Running in dev environment

1. Set up API server from https://github.com/zelos-app/COVID-Help-Server
2. Run `npm run start`

## Running in staging/production

1. Rename `example.env` to `.env` and configure your deployment
2. Run `docker-compose up -d`

SSL is handled by Traefik using Letsencrypt automatically
