const express = require('express');
const router = express.Router({mergeParams : true});
const {validateComment, isLoggedIn, isCommentAuthor} = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const comments = require('../controllers/comments.js')
const Event = require('../models/event');//requiring the Event model
const Comment = require('../models/comment.js');


router.post('/', isLoggedIn, validateComment, catchAsync(comments.createComment));
  
router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(comments.deleteComment));

module.exports = router;