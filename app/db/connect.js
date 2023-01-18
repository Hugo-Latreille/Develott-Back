const Pool = require("pg-pool");

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

// pool.connect((err) => {
// 	if (err) {
// 		console.error("erreur de connection", err.stack);
// 	} else {
// 		console.error("connection OK");
// 	}
// });

module.exports = pool;
