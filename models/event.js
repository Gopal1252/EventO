const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//basically EventO will sell tickets of events
const EventSchema = new Schema({
    title: String,//title of the event
    image: String,//pictures posted of the event
    price: Number,//price per ticket
    description : String,//description of the event
    location: String,//location(city,State) of the event
    venue:String,//venue of the event(actually venue like-> some auditorium/stadium,etc)
    date:Date,
    time:String
})

module.exports = mongoose.model('Event',EventSchema)