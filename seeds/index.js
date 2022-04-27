const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '624171f1d453b97a5f01bb39',
            location: `${cities[random1000].city}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae quod quisquam assumenda in officia repudiandae eos labore nesciunt suscipit! Temporibus, voluptates aliquam vel officia velit nobis ut ex ratione ducimus!', 
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].lng,
                    cities[random1000].lat, 
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/df3dxcrr8/image/upload/v1648462899/YelpCamp/dedcfyr5vffqlhjtv4gh.jpg',
                    filename: 'YelpCamp/dedcfyr5vffqlhjtv4gh',
                },
                {
                    url: 'https://res.cloudinary.com/df3dxcrr8/image/upload/v1648462900/YelpCamp/wjjttpsqsdsqtfgbkesl.jpg',
                    filename: 'YelpCamp/wjjttpsqsdsqtfgbkesl',
                },
                {
                    url: 'https://res.cloudinary.com/df3dxcrr8/image/upload/v1648462899/YelpCamp/aiaqdc6qo9yhyt98a9cy.jpg',
                    filename: 'YelpCamp/aiaqdc6qo9yhyt98a9cy',
                }
            ]
        })
        await camp.save();
    } 
}


seedDB().then(() => {
    mongoose.connection.close();
});