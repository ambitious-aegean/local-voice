const express = require('express');
/* Require your controllers here */
const issueModal = require('../controllers/issueModal/issueModal.js');
const { getComments } = require('../controllers/commentsControllers.js');
const { postComment } = require('../controllers/commentsControllers.js');
const { allIssues } = require('../controllers/issuesControllers.js');

const router = express.Router();

/* Use this format */
//router.get('/comments', issueModal.getComments);
router.get('/comments', getComments);
router.post('/comments', postComment);

router.get('/allIssues', allIssues);

module.exports = router;
