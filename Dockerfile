FROM nginx:latest

COPY ./docker-entrypoint.sh /
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /app

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]