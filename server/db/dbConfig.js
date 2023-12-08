const mysql2 = require("mysql2");

// // development
// const dbConnection = mysql2.createPool({
// 	user: "evangadi-admin",
// 	database: "try_evangadi",
// 	host: "localhost",
// 	password: "12345",
// 	connectionLimit: 10,
// });

// production
const dbConnection = mysql2.createPool({
	user: process.env.USER,
	database: process.env.DATABASE,
	host: "db4free.net",
	password: process.env.PASS,
	connectionLimit: 10,
	connectTimeout: 60000,
});

dbConnection.execute("select 'test'");
// dbConnection

module.exports = dbConnection.promise();
