const express = require('express');

const discussionRoutes = express.Router;

const db = require('../../db/index.js');

const getComments = (req, res) => {
  const { issue_id } = req.query;
  const query = `SELECT * FROM comments WHERE issue_id = ${issue_id}`;
  db.query(query, (err, results) => {
    if (err) { throw err; }
    res.status(200).send(results);
  });
};

const postComment = (req, res) => {
  const {
    issue_id, text, user_id, date,
  } = req.body;
  const query = `INSERT INTO comments (issue_id, text, user_id, date) VALUES ('${issue_id}', '${text}', '${user_id}', '${date}')`;
  db.query(query, (err, result) => {
    if (err) { throw err; }
    res.status(200).send(result);
  });
};

module.exports = {
  getComments,
  postComment,
};
