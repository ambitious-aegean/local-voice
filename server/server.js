const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const router = require('./routes/routes.js');
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

const db = require('../db/index.js');

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
