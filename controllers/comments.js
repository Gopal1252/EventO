const Event = require('../models/event');//requiring the Event model
const Comment = require('../models/comment.js');

module.exports.createComment = async(req,res,next)=>{
    const event = await Event.findById(req.params.id);
    const comment = new Comment(req.body.comment);
    comment.author = req.user._id;
    comment["date"] = new Date();
    event.comments.push(comment);
    await comment.save();
    await event.save();
    req.flash('success', "Posted your comment!")
    res.redirect(`/events/${event._id}`);
}

module.exports.deleteComment = async(req,res) =>{
    const {id, commentId } = req.params;
    await Event.findByIdAndUpdate(id,{$pull : {comments: commentId}});
    await Comment.findByIdAndDelete(commentId);
    req.flash('success', "Removed your comment!")
    res.redirect(`/events/${id}`);
}