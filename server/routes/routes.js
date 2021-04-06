const express = require('express');
/* Require your controllers here */
const issueModal = require('../controllers/issueModal/issueModal.js');
const { getComments } = require('../controllers/commentsControllers.js');
const { postComment } = require('../controllers/commentsControllers.js');

const { getReps } = require('../controllers/repsController.js');
const { getAddress, getLocation } = require('../controllers/locAddController.js');

const router = express.Router();

/* Use this format */
//router.get('/comments', issueModal.getComments);
router.get('/comments', getComments);
router.post('/comments', postComment);

router.get('/reps', getReps);

router.get('/address', getAddress);
router.get('/location', getLocation);

module.exports = router;
