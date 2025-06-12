const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'mule-milb.cynx4asvhj9d.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Zeu$1987',
    database: 'milb_db',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool; 