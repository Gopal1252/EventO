const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const IndianCities = require('./IndianCities');
const {names, descriptors, venues} = require('./seedHelpers')
const Event = require('../models/event');


//connecting mongoose
mongoose.set('strictQuery', true);
main().catch(err => {
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/EventO_DB');
  console.log("Database Connected");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async ()=>{
    await Event.deleteMany({});//so that every time we reseed, the older events get deleted
    for(let i=0;i<50;i++){
        const random200 = Math.floor(Math.random()*200);///gives a random number from 0 to 200
        const price = Math.floor(Math.random()*20) + 10;
        const event = new Event({
            location: `${IndianCities[random200].city}, ${IndianCities[random200].state}`,
            title: `${sample(descriptors)} ${sample(names)}`,//descriptors, names and venues are being exported from the seeds folders
            venue: `${sample(venues)}`,
            image: `https://source.unsplash.com/collection/22465791`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione adipisci laudantium sequi, corporis officiis quam aliquam libero sit reprehenderit id dolorum, quia perspiciatis voluptates sint. Itaque molestiae modi assumenda ad?',
            price
        })
        await event.save();
    }
}

//so that automatically the connection to the database gets closed once we seed the data
seedDB().then(() =>{
    mongoose.connection.close();
})
