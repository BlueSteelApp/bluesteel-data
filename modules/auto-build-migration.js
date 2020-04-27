require('dotenv').config();
const fs=require("fs");
const path=require("path");
const os=require("os");

const {
	DATABASE_NAME:name,
	DATABASE_USER:user,
	DATABASE_PASSWORD:password,
	DATABASE_HOST:host,
	DATABASE_PORT:port,
	DATABASE_TYPE:dialect
} = process.env;



fs.mkdtemp(path.join(os.tmpdir(), 'bluesteel-migration-'), (err, directory) => {
  if (err) throw err;
	var SequelizeAuto = require('sequelize-auto-v2')
	var auto = new SequelizeAuto(name, user, password,{
		dialect,
		host,
		port,
		directory
	});

	auto.run(function (err) {
		if (err) throw err;

		console.log({directory});
		console.log(auto.tables); // table list
		//console.log(auto.foreignKeys); // foreign key list
	});
});
