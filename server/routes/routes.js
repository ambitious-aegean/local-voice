const express = require('express');
/* Require your controllers here */
const issueModal = require('../controllers/issueModal/issueModal.js');

const router = express.Router();

/* Use this format */
router.get('/comments', issueModal.getComments);

module.exports = router;
