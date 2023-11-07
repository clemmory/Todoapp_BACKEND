const Pool = require('pg').Pool;

const pool = new Pool ({
    user:'clemmory',
    host:'localhost',
    database:'todoapp',
    password:'Svli937!$TrQ',
    port: 5432,
});

module.exports = pool;