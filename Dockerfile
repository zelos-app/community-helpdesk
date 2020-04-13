FROM node:12 as build-deps

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm ci
COPY . ./
RUN npm run build

FROM nginx:latest

COPY ./docker-entrypoint.sh /
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /app

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]