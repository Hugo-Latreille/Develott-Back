//todo pool ou client ? 
const Pool = require('pg-pool');

const pool = new Pool({
    connectionString:process.env.DATABASE_URL
});

pool.connect();

module.exports = pool ;

