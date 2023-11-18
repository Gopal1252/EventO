const {eventSchema, commentSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Event = require('./models/event');//requiring the Event model
const Comment = require('./models/comment.js');



module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
}

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

module.exports.validateEvent = (req,res,next) =>{
    const {error} = eventSchema.validate(req.body);//passing the data to the eventSchema
    if(error){
      const msg = error.details.map((el=> el.message)).join(',')
      throw new ExpressError(msg, 400);
    }else{
      next();
    }
}

module.exports.isOrganizer = async(req, res, next) =>{
  const {id} = req.params;
  const event = await Event.findById(id);
  if(!event.organizer.equals(req.user._id)){
    req.flash('error', 'You do not have permission to do that!');
    return res.redirect(`/events/${id}`);
  }
  next();
}

module.exports.isCommentAuthor = async(req, res, next) =>{
    const {id, commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if(!comment.author.equals(req.user._id)){
      req.flash('error', 'You do not have permission to do that!');
      return res.redirect(`/events/${id}`);
    }
    next();
  }

module.exports.validateComment = (req,res,next) =>{
    const {error} = commentSchema.validate(req.body);//passing the data to the eventSchema
    if(error){
      const msg = error.details.map((el=> el.message)).join(',')
      throw new ExpressError(msg, 400);
    }else{
      next();
    }
  }