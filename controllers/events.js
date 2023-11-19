const Event = require('../models/event');//requiring the Event model

module.exports.index = async (req,res) =>{
    const events = await Event.find({});
    res.render('events/index', {events});
}

module.exports.renderNewForm = async (req,res) =>{
    res.render('events/new');
}

module.exports.createEvent = async (req, res,next) =>{
    const event = new Event(req.body.event);//making the new event
    event.organizer = req.user._id//saving the organizer's id
    await event.save();//saving the new event
    req.flash('success', 'Successfully listed your event'); 
    res.redirect(`/events/${event._id}`);//redirecting to the newely formed event
}

module.exports.showEvent = async (req,res)=>{
    const event = await Event.findById(req.params.id).populate({
      path : 'comments',
      populate : {
        path : 'author'
      }
    }).populate('organizer'); 
    if(!event){
      req.flash('error','Cannot find that event');
      return res.redirect('/events');
    }
    res.render('events/show',{event});
}

module.exports.renderEditForm = async (req, res) =>{
    const {id} = req.params;
    const event = await Event.findById(id);
    if(!event){
      req.flash('error','Cannot find that event');
      return res.redirect('/events');
    }
    res.render('events/edit',{event});
}

module.exports.updateEvent = async (req, res) =>{
    const {id} = req.params;
    const event = await Event.findByIdAndUpdate(id, {...req.body.event});//finding by id ad updating the contents of the event in the database
    req.flash('success', 'Successfully updated your event'); 
    res.redirect(`/events/${event._id}`);//redirecting to the updated event
}

module.exports.deleteEvent = async (req, res) =>{
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your event'); 
    res.redirect(`/events`);//redirecting to all events
}