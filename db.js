require('dotenv').config();

const Pool = require('pg').Pool;

const dbUser = process.env.USER;
const dbHost = process.env.HOST;
const dbName = process.env.DATABASE;
const dbPass = process.env.PASSWORD;


const pool = new Pool ({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPass,
    port: 5432,
});

module.exports = pool;
