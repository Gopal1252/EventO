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

function generateRandomDate(from, to) {
    return new Date(
      from.getTime() +
        Math.random() * (to.getTime() - from.getTime()),
    );
}

function generateRandomTime() {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 60);
    const amPm = Math.random() < 0.5 ? "AM" : "PM";
    return `${hour}:${minute < 10 ? "0" : ""}${minute}${amPm}`;
}

const seedDB = async ()=>{
    await Event.deleteMany({});//so that every time we reseed, the older events get deleted
    for(let i=0;i<50;i++){
        const random200 = Math.floor(Math.random()*200);///gives a random number from 0 to 200
        const price = Math.floor(Math.random()*2000) + 10;
        const date = generateRandomDate(new Date(2023, 10, 1), new Date(2023,11,31));
        const time = generateRandomTime();
        const event = new Event({
            organizer : '65575221053a3ba4d4cc5cc1',
            location: `${IndianCities[random200].city}, ${IndianCities[random200].state}`,
            title: `${sample(descriptors)} ${sample(names)}`,//descriptors, names and venues are being exported from the seeds folders
            venue: `${sample(venues)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione adipisci laudantium sequi, corporis officiis quam aliquam libero sit reprehenderit id dolorum, quia perspiciatis voluptates sint. Itaque molestiae modi assumenda ad?',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [
                  IndianCities[random200].lng,
                  IndianCities[random200].lat
              ] 
            },
            date,
            time,
            images: [
                {
                  url: 'https://res.cloudinary.com/dk8h5rpgt/image/upload/v1704875015/EventO/iv4pfl20go5kd65oiwrd.jpg',
                  filename: 'EventO/iv4pfl20go5kd65oiwrd'
                },
                {
                  url: 'https://res.cloudinary.com/dk8h5rpgt/image/upload/v1704875022/EventO/uclvzwnfqfbw6lfs9yfr.jpg',
                  filename: 'EventO/uclvzwnfqfbw6lfs9yfr'
                }
              ]
        })
        await event.save();
    }
}

//so that automatically the connection to the database gets closed once we seed the data
seedDB().then(() =>{
    mongoose.connection.close();
})
