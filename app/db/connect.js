const Pool = require("pg-pool");

const pool = new Pool({
	connectionString:
		"postgres://develott:OukF0DrRC7zU@ep-black-cloud-602350.eu-central-1.aws.neon.tech/develott",
	ssl: {
		rejectUnauthorized: false,
	},
});

pool.connect((err) => {
	if (err) {
		console.error("erreur de connection", err.stack);
	} else {
		console.error("connection OK");
	}
});

module.exports = pool;
