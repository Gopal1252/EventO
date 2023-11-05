const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');//for inserting dynamic content in the boiler plate
const {eventSchema} = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');//for overriding the POST method and make it PUT for the edit forms
const Event = require('./models/event');//requiring the Event model

//connecting mongoose
mongoose.set('strictQuery', true);
main().catch(err => { 
    console.log(err);
});

async function main() { 
  await mongoose.connect('mongodb://127.0.0.1:27017/EventO_DB');
  console.log("Database Connected");
}


const app = express(); 

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");

//for parsing the req.body sent in the post request from the new event form
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());//from the starter template {when tailwind problem came}

const validateEvent = (req,res,next) =>{
  const {error} = eventSchema.validate(req.body);//passing the data to the eventSchema
  if(error){
    const msg = error.details.map((el=> el.message)).join(',')
    throw new ExpressError(msg, 400);
  }else{
    next();
  }
}

//renders the home page
app.get('/', (req,res) =>{
  res.render('home');
})

//renders the index of Events {Basically Shows all the current events going on}
app.get('/events', catchAsync(async (req,res) =>{
  const events = await Event.find({});
  res.render('events/index', {events});
}))

app.get('/about', (req,res) =>{
  res.render('about');
})
app.get('/contact', (req,res) =>{
  res.render('contact');
})

//to make new event {need two routes, first for rendering the form when the link/buttonn is clicked and second the post route for storing the nnewly made event}
app.get('/events/new', catchAsync(async (req,res) =>{
  res.render('events/new');
}))
app.post('/events', validateEvent, catchAsync(async (req, res,next) =>{
  const event = new Event(req.body.event);//making the new event
  await event.save();//saving the new event
  res.redirect(`/events/${event._id}`);//redirecting to the newely formed event
}))

//show route {make sure comes after new}
app.get('/events/:id', catchAsync(async (req,res)=>{
  const event = await Event.findById(req.params.id) 
  res.render('events/show',{event});
}))

//for editing, need 2 routes
app.get('/events/:id/edit', catchAsync(async (req, res) =>{
  const event = await Event.findById(req.params.id)
  res.render('events/edit',{event});
}))
app.put('/events/:id', validateEvent, catchAsync(async (req, res) =>{
  const {id} = req.params;
  const event = await Event.findByIdAndUpdate(id, {...req.body.event});//finding by id ad updating the contents of the event in the database
  res.redirect(`/events/${event._id}`);//redirecting to the updated event
}))

//delete event route
app.delete('/events/:id', catchAsync(async (req, res) =>{
  const {id} = req.params;
  await Event.findByIdAndDelete(id);
  res.redirect(`/events`);//redirecting to all events
}))

app.all('*',(req,res,next)=>{
  next(new ExpressError("Page Not Found",404))
})

app.use((err,req,res,next) =>{
  const {statusCode = 500} = err;
  if(!err.message) err.message = "Something Went Wrong";
  res.status(statusCode).render('error',{err});
})

// server listening
app.listen(PORT, () => {
  console.log("serving on port 3000!");
});

