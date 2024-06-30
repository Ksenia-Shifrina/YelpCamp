const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const User = require('../models/user');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random543 = Math.floor(Math.random() * 543);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63b68bcb3be79f9d3b4af613',
            location: `${cities[random543].city}, ${cities[random543].state}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random543].longitude,
                    cities[random543].latitude,
                ]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/drwdksgpn/image/upload/v1673508060/YelpCamp/jcz8hzmt66fobvfr5nrs.jpg',
                    filename: 'YelpCamp/jcz8hzmt66fobvfr5nrs'
                },
                {
                  url: 'https://res.cloudinary.com/drwdksgpn/image/upload/v1673508074/YelpCamp/xk2mq7k8wvhdmwblkmaq.jpg',
                  filename: 'YelpCamp/xk2mq7k8wvhdmwblkmaq'
                }
              ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eius repudiandae quasi adipisci corrupti distinctio cupiditate magnam. Ducimus distinctio minus perspiciatis. Velit deserunt nostrum nisi ea molestiae dolorem eos cumque! Nostrum aliquid quasi inventore, doloribus consequatur praesentium iusto illo exercitationem consequuntur labore nihil, sit dicta necessitatibus dolorem rem delectus libero voluptates odit deserunt quas molestiae laudantium aliquam dignissimos? Eos, in.',
            price
        })
        await camp.save();
        console.log('added')
    }
}


seedDB().then(() => {
    mongoose.connection.close();
    console.log('connection closed');
})