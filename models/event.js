const mongoose = require('mongoose');
const Comment = require('./comment')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function(){//adding a virtual property to the images to make the thumbnails of smaller size
    return this.url.replace('/upload', '/upload/w_200');
});

const opts = {toJSON: {virtuals: true}};

//basically EventO will sell tickets of events
const EventSchema = new Schema({
    title: String,//title of the event
    images: [ImageSchema],
    geometry: {
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,//price per ticket
    description : String,//description of the event
    location: String,//location(city,State) of the event
    venue:String,//venue of the event(actually venue like-> some auditorium/stadium,etc)
    date:Date,
    time:String, 
    organizer: {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
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