const express = require('express');
/* Require your controllers here */
const { getComments } = require('../controllers/commentsControllers.js');
const { postComment } = require('../controllers/commentsControllers.js');

const router = express.Router();

/* Use this format */
router.get('/comments', getComments);
router.post('/comments', postComment);

module.exports = router;
