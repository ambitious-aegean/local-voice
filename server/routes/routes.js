const express = require('express');
/* Require your controllers here */
const { getComments } = require('../controllers/commentsControllers.js');
const { postComment } = require('../controllers/commentsControllers.js');
const { allIssues } = require('../controllers/issuesControllers.js');

const { getReps } = require('../controllers/repsController.js');
const { getAddress, getLocation } = require('../controllers/locAddController.js');

const { postIssue } = require('../controllers/postIssueController.js');

const issuesMetaRouter = require('./issuesMetaRouter.js');


const router = express.Router();

/* Use this format */
router.get('/comments', getComments);
router.post('/comments', postComment);

router.get('/reps', getReps);

router.get('/address', getAddress);
router.get('/location', getLocation);
router.get('/allIssues', allIssues);
router.post('/postIssue', postIssue);

router.use('/allIssues', issuesMetaRouter);

module.exports = router;
