const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1193207526',
    database: 'mynewdatabase', 
});

module.exports = pool.promise();
