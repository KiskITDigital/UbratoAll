FROM alpine:3.21

RUN apk add --no-cache curl

WORKDIR /migration

COPY ./migration .

CMD ["./migration.sh"]
