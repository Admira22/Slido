const pg = require('pg');

const config = {
    user: 'iichjuii',
    database: 'iichjuii',
    password: 'G6DUUlntkCHaRSYAe-n62pQqkK5JcQY9',
    host: 'lucky.db.elephantsql.com',
    port: 5432,
    max: 100,
    idleTimeoutMillis: 30000,
}
const pool = new pg.Pool(config);
module.exports = pool;