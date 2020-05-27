# Docker para desarrollo
FROM node:14.3.0

ENV RABBIT_URL amqp://host.docker.internal
ENV REDIS_URL host.docker.internal
ENV AUTH_SERVICE_URL http://host.docker.internal:3000

WORKDIR /app

# Puerto de image service
EXPOSE 3001

CMD npm install && npm start
