const express = require('express');

const app = express();
const port = 3000;
const path = require('path');
const router = require('./routes/routes.js');
const issuesMetaRouter = require('./routes/issuesMetaRoutes.js');
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/public')));

const db = require('../db/index.js');

app.get('/allIssues', (req, res) => {
  const query = `SELECT i.*, c.cat_name, p.photo_info, u.username FROM issues i
    LEFT JOIN issues_category ic on i.issue_id = ic.issue_id
    LEFT JOIN categories c on c.cat_id = ic.cat_id
    LEFT JOIN photos p on p.issue_id = i.issue_id
    LEFT JOIN users u on u.user_id = i.user_id`;
  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const issueData = {};
      data.forEach((row) => {
        if (!issueData[row.issue_id]) {
          const rowObj = row;
          rowObj.categories = [];
          rowObj.photos = [];
          rowObj.categories.push(row.cat_name);
          rowObj.photos.push(row.photo_info);
          delete rowObj.cat_name;
          delete rowObj.photo_info;
          issueData[row.issue_id] = rowObj;
        } else {
          if (issueData[row.issue_id].categories.indexOf(row.cat_name) === -1) {
            issueData[row.issue_id].categories.push(row.cat_name);
          }
          if (issueData[row.issue_id].photos.indexOf(row.photo_info) === -1) {
            issueData[row.issue_id].photos.push(row.photo_info);
          }
        }
      });
      const issueArr = [];
      Object.keys(issueData).forEach((key) => {
        issueArr.push(issueData[key]);
      });
      res.send(issueArr);
    }
  });
});

app.use('/', router);
app.use('/issues', issuesMetaRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
