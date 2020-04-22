require('dotenv').config();
const {
	DATABASE_NAME:name,
	DATABASE_USER:user,
	DATABASE_PASSWORD:password,
	DATABASE_HOST:host,
	DATABASE_PORT:port,
	DATABASE_TYPE:dialect
} = process.env;

var SequelizeAuto = require('sequelize-auto-v2')
var auto = new SequelizeAuto(name, user, password,{
	dialect,
  host,
  port
});

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  //console.log(auto.foreignKeys); // foreign key list
});
