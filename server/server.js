const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const router = require('./routes/routes.js');
const issuesMetaRouter = require('./routes/issuesMetaRoutes.js');
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/', router);
app.use('/issues', issuesMetaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
