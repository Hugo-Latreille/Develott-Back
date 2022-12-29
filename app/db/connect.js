const Pool = require("pg-pool");

const pool = new Pool({
	connectionString:
		"postgres://tjfwqego:bHCjuaUdNMKKWcF03C1LEqDp7wmpN3sQ@mel.db.elephantsql.com/tjfwqego",
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
