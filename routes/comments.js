const express = require('express');
const router = express.Router({mergeParams : true});
const {validateComment, isLoggedIn, isCommentAuthor} = require('../middleware.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Event = require('../models/event');//requiring the Event model
const Comment = require('../models/comment.js');


router.post('/', isLoggedIn, validateComment, catchAsync(async(req,res,next)=>{
  const event = await Event.findById(req.params.id);
  const comment = new Comment(req.body.comment);
  comment.author = req.user._id;
  comment["date"] = new Date();
  event.comments.push(comment);
  await comment.save();
  await event.save();
  req.flash('success', "Posted your comment!")
  res.redirect(`/events/${event._id}`);
}))
  
router.delete('/:commentId', isLoggedIn, isCommentAuthor, catchAsync(async(req,res) =>{
  const {id, commentId } = req.params;
  await Event.findByIdAndUpdate(id,{$pull : {comments: commentId}});
  await Comment.findByIdAndDelete(commentId);
  req.flash('success', "Removed your comment!")
  res.redirect(`/events/${id}`);
}))

module.exports = router;