const express = require('express');
const router = express.Router({mergeParams : true});
const {commentSchema} = require('../schemas.js');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError')
const Event = require('../models/event');//requiring the Event model
const Comment = require('../models/comment.js');

const validateComment = (req,res,next) =>{
  const {error} = commentSchema.validate(req.body);//passing the data to the eventSchema
  if(error){
    const msg = error.details.map((el=> el.message)).join(',')
    throw new ExpressError(msg, 400);
  }else{
    next();
  }
}

router.post('/', validateComment, catchAsync(async(req,res,next)=>{
  const event = await Event.findById(req.params.id);
  const comment = new Comment(req.body.comment);
  comment["date"] = new Date();
  event.comments.push(comment);
  await comment.save();
  await event.save();
  req.flash('success', "Posted your comment!")
  res.redirect(`/events/${event._id}`);
}))
  
router.delete('/:commentId', catchAsync(async(req,res) =>{
  const {id, commentId } = req.params;
  await Event.findByIdAndUpdate(id,{$pull : {comments: commentId}});
  await Comment.findByIdAndDelete(commentId);
  req.flash('success', "Removed your comment!")
  res.redirect(`/events/${id}`);
}))

module.exports = router;