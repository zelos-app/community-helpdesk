# Ticketing system for taking and managing requests from people in need during the COVID crisis

## Running in dev environment

1. Set up API server from https://github.com/zelos-app/COVID-Help-Server
2. Run `npm run start`

## Running in staging/production

1. Set up variables for docker-compose: `export APP_DOMAIN=yourdomain.com && export ACME_EMAIL=your@email.com && export MONGO_USER=root && export MONGO_PASSWORD=rootpassword && export STAGE=production/staging/...`
2. Create and configure `${STAGE}.env` for API settings
3. Run `docker-compose up -d`