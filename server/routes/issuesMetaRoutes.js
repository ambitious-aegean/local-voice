/* eslint-disable camelcase */
const express = require('express');

const db = require('../../db/index.js');

const issuesMetaRouter = express.Router();

issuesMetaRouter.put('/up_vote', (req, res) => {
  const { issue_id, user_id } = req.query;
  const query1 = `SELECT *
  FROM user_up_vote
  WHERE user_id = ${user_id}
  AND issue_id=${issue_id}`;
  db.query(query1, (err1, data) => {
    if (err1) { throw err1; }
    if (data.length) {
      res.send('already voted');
    } else {
      db.query(`UPDATE issues
        SET up_vote =  up_vote + 1
        WHERE issue_id = ${issue_id}`,
      (err2, result) => {
        if (err2) { throw err2; }
        const query3 = `INSERT INTO user_up_vote(user_id, issue_id)
        VALUES(${user_id}, ${issue_id})`;
        db.query(query3, (err3, data2) => {
          if (err3) { throw err3; }
          res.status(200).send(result);
        });
      });
    }
  });
});

issuesMetaRouter.put('/flag_count', (req, res) => {
  const { issue_id, user_id } = req.query;
  const query1 = `SELECT *
  FROM user_flag
  WHERE user_id = ${user_id}
  AND issue_id = ${issue_id}`;
  db.query(query1, (err1, data) => {
    if (err1) { throw err1; }
    if (data.length) {
      res.send('already flagged');
    } else {
      db.query(`UPDATE issues SET flag_count = flag_count + 1 WHERE issue_id = ${issue_id}`, (err2, result) => {
        if (err2) { throw err2; }
        const query3 = `INSERT INTO user_flag(user_id, issue_id)
        VALUES(${user_id}, ${issue_id})`;
        db.query(query3, (err3, data2) => {
          if (err3) { throw err3; }
          res.status(200).send(result);
        });
      });
    }
  });
});

issuesMetaRouter.put('/down_vote', (req, res) => {
  const { issue_id, user_id } = req.query;
  db.query(`UPDATE issues
        SET up_vote = up_vote - 1
        WHERE issue_id = ${issue_id}`,
  (err, result) => {
    if (err) { throw err; }
    const query3 = `DELETE FROM user_up_vote
    WHERE user_id = ${user_id} AND issue_id = ${issue_id}`;
    db.query(query3, (err1, data) => {
      if (err1) { throw err1; }
      res.status(204).send(data);
    });
  });
});

module.exports = issuesMetaRouter;
