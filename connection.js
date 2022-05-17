const {Client} = require('pg');

const client = new Client ({
    host: 'localhost',
    user: 'postgres',
    password: 'pass123',
    database: 'testdb',
    port : 5432
})

module.exports = client