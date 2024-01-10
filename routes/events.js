const express = require('express');
const router = express.Router();
const events = require('../controllers/events');
const catchAsync = require('../utils/catchAsync');
const Event = require('../models/event');//requiring the Event model
const {isLoggedIn, isOrganizer, validateEvent} = require('../middleware');
const multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(events.index))
    .post(isLoggedIn, upload.array('image'), validateEvent, catchAsync(events.createEvent))

router.get('/new', isLoggedIn, catchAsync(events.renderNewForm));

router.route('/:id')
    .get(catchAsync(events.showEvent))
    .put(isLoggedIn, isOrganizer, upload.array('image'), validateEvent, catchAsync(events.updateEvent))
    .delete(isLoggedIn, isOrganizer, catchAsync(events.deleteEvent))

router.get('/:id/edit', isLoggedIn, isOrganizer, catchAsync(events.renderEditForm));

module.exports = router;
  
