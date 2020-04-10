FROM node:12

WORKDIR /usr/src/app

RUN set -ex \
    && npm install -g pm2

COPY ./node_modules ./node_modules
COPY ./middleware ./middleware
COPY ./routes ./routes
COPY ./models ./models
COPY ./app.js ./app.js

EXPOSE 8000

CMD ["pm2-runtime","app.js"]