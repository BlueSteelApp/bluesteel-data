#!/bin/bash
#sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect [dialect] -c [/path/to/config] -o [/path/to/models]

if [ -f .env ]
then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi
sequelize-auto -h localhost -u $DATABASE_USER -d $DATABASE_NAME -x $DATABASE_PASSWORD -p 3306 --dialect mysql -c sequelize-auto-settings.json -o app/models
