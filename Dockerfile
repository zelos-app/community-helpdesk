FROM node:12 as build-deps

ARG

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --node-flags --max-old-space-size=${MEM_LIMIT}
COPY . ./
RUN npm run build --node-flags --max-old-space-size=${MEM_LIMIT}

FROM nginx:latest

COPY ./docker-entrypoint.sh /
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-deps /usr/src/app/build /app

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]