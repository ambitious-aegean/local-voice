/* eslint-disable camelcase */
const express = require('express');

const db = require('../../db/index.js');

const issuesMetaRouter = express.Router();

issuesMetaRouter.put('/up_vote', (req, res) => {
  const { issue_id } = req.query;
  db.query(`UPDATE issues
    SET up_vote =  up_vote + 1
    WHERE issue_id = ${issue_id}`,
  (err, result) => {
    if (err) { throw err; }
    res.status(200).send(result);
  });
});

issuesMetaRouter.put('/flag_count', (req, res) => {
  const { issue_id } = req.query;
  db.query(`UPDATE issues SET flag_count = flag_count + 1 WHERE issue_id = ${issue_id}`, (err, result) => {
    if (err) { throw err; }
    res.status(200).send(result);
  });
});

module.exports = issuesMetaRouter;
