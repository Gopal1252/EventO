const mongoose = require('mongoose');
const Comment = require('./comment')
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
    time:String, 
    comments: [
        {
            type : Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
});

EventSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Comment.deleteMany({
            _id : {
                $in : doc.comments
            }
        })
    }
})

module.exports = mongoose.model('Event',EventSchema)