const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'my_db',
});

const db = connection.connect((err) => {
  if (err) {
    console.log('Error connecting to db');
  } else {
    console.log('success');
  }
});

module.exports = db;
