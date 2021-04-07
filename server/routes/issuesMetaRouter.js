/* eslint-disable camelcase */
const express = require('express');

const { up_vote, flag, down_vote, unflag, watch, unwatch } = require('../controllers/issuesMetaControllers.js');

const issuesMetaRouter = express.Router();

issuesMetaRouter.put('/up_vote', up_vote);

issuesMetaRouter.put('/flag', flag);

issuesMetaRouter.put('/down_vote', down_vote);

issuesMetaRouter.put('/unflag', unflag);

issuesMetaRouter.put('/watch', watch);

issuesMetaRouter.delete('/unwatch', unwatch);

module.exports = issuesMetaRouter;
