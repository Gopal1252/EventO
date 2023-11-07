const express = require("express");
const path = require('path');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');//for inserting dynamic content in the boiler plate
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override');//for overriding the POST method and make it PUT for the edit forms

const events = require('./routes/events');
const comments = require('./routes/comments');

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

const sessionConfig = {
  secret : "badsecret",
  resave : false,
  saveUninitialized : true,
  cookie : {
    httpOnly : true,
    expires : Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge : 1000 * 60 * 60 * 24 * 7,
  } 
}

app.use(session(sessionConfig));
app.use(flash());

app.use((req,res,next) =>{
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

app.use('/events', events);
app.use('/events/:id/comments',comments);

//renders the home page
app.get('/', (req,res) =>{
  res.render('home');
})

app.get('/about', (req,res) =>{
  res.render('about');
})
app.get('/contact', (req,res) =>{
  res.render('contact');
})

app.all('*',(req,res,next)=>{
  next(new ExpressError("Page Not Found",404))
})

//error handler
app.use((err,req,res,next) =>{
  const {statusCode = 500} = err;
  if(!err.message) err.message = "Something Went Wrong";
  res.status(statusCode).render('error',{err});
})

// server listening
app.listen(PORT, () => {
  console.log("serving on port 3000!");
});

