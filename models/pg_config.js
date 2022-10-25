const Pool = require('pg').Pool;
const pg_conn = new Pool (
    {
        user:'knuckzhfcsvpqb',
        password:'74804e700249d3079a7561c9ce8c621be5a0b5e02731a240376e97ca48e3a88a',
        host:'ec2-3-214-2-141.compute-1.amazonaws.com',
        database:'d4k4m2uk59m4dj',
        port:5432,
        ssl: {
            rejectUnauthorized: false
        },
    });

module.exports = pg_conn;