const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Event = require('../models/event');//requiring the Event model
const {isLoggedIn, isOrganizer, validateEvent} = require('../middleware');


//renders the index of Events {Basically Shows all the current events going on}
router.get('/', catchAsync(async (req,res) =>{
    const events = await Event.find({});
    res.render('events/index', {events});
  }))
  
//to make new event {need two routes, first for rendering the form when the link/buttonn is clicked and second the post route for storing the nnewly made event}
router.get('/new', isLoggedIn, catchAsync(async (req,res) =>{
  
  res.render('events/new');
}))
router.post('/', isLoggedIn, validateEvent, catchAsync(async (req, res,next) =>{
  const event = new Event(req.body.event);//making the new event
  event.organizer = req.user._id//saving the organizer's id
  await event.save();//saving the new event
  req.flash('success', 'Successfully listed your event'); 
  res.redirect(`/events/${event._id}`);//redirecting to the newely formed event
}))

//show route {make sure comes after new}
router.get('/:id', catchAsync(async (req,res)=>{
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
}))

//for editing, need 2 routes
router.get('/:id/edit', isLoggedIn, isOrganizer, catchAsync(async (req, res) =>{
  const {id} = req.params;
  const event = await Event.findById(id);
  if(!event){
    req.flash('error','Cannot find that event');
    return res.redirect('/events');
  }
  res.render('events/edit',{event});
}))
router.put('/:id', isLoggedIn, isOrganizer, validateEvent, catchAsync(async (req, res) =>{
  const {id} = req.params;
  const event = await Event.findByIdAndUpdate(id, {...req.body.event});//finding by id ad updating the contents of the event in the database
  req.flash('success', 'Successfully updated your event'); 
  res.redirect(`/events/${event._id}`);//redirecting to the updated event
}))

//delete event route
router.delete('/:id', isLoggedIn, isOrganizer, catchAsync(async (req, res) =>{
  const {id} = req.params;
  await Event.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted your event'); 
  res.redirect(`/events`);//redirecting to all events
}))

module.exports = router;
  
