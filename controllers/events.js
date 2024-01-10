const Event = require('../models/event');//requiring the Event model
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req,res) =>{
    const events = await Event.find({});
    res.render('events/index', {events});
}

module.exports.renderNewForm = async (req,res) =>{
    res.render('events/new');
}

module.exports.createEvent = async (req, res,next) =>{
    const event = new Event(req.body.event);//making the new event
    event.images = req.files.map(f=>({url : f.path, filename : f.filename}));
    event.organizer = req.user._id//saving the organizer's id
    await event.save();//saving the new event
    // console.log(event);
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
    // console.log(req.body);
    const event = await Event.findByIdAndUpdate(id, {...req.body.event});//finding by id ad updating the contents of the event in the database
    const imgs = req.files.map(f=>({url : f.path, filename : f.filename}));
    event.images.push(...imgs);
    await event.save();
    if(req.body.deleteImages){
      for(let filename of req.body.deleteImages){
        await cloudinary.uploader.destroy(filename);//deleting the images from cloudinary
      }
      await event.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});//then deleting the images from mongo
    }
    req.flash('success', 'Successfully updated your event'); 
    res.redirect(`/events/${event._id}`);//redirecting to the updated event
}

module.exports.deleteEvent = async (req, res) =>{
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted your event'); 
    res.redirect(`/events`);//redirecting to all events
}