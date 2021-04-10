/*
Don't delete this!
Copy the contents of this file into 'db/index.js' and configure it to your local machine.
It'll be gitignored
*/

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'local_voice',
});
connection.connect((err) => {
  if (err) {
    console.log('Error connecting to db');
  } else {
    console.log('success');
  }
});
module.exports = connection;
