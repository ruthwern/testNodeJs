// db.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Your database host
  user: 'root',      // Your database user
  password: '',      // Your database password
  database: 'odds_dumper', // Your database name
});

// Export the pool
module.exports = pool.promise();



