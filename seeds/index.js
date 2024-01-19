const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect("mongodb+srv://BurtonBoy94:Ilikepie94!@cluster0.r553kod.mongodb.net/?retryWrites=true&w=majority")
const uri = "mongodb+srv://BurtonBoy94:Ilikepie94!@cluster0.r553kod.mongodb.net/?retryWrites=true&w=majority";

async function main() {
    await mongoose.connect('mongodb+srv://BurtonBoy94:Ilikepie94!@cluster0.r553kod.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connection Made')
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 250; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '659bda1009d288c027905fc1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [`${cities[random1000].longitude}`, `${cities[random1000].latitude}`]
            },
            images:[
                {
                url: 'https://res.cloudinary.com/dabks3ssu/image/upload/v1705592067/x5h0fbug7tktllm3zlgo.jpg',
                filename: 'Yelpcamp/5h0fbug7tktllm3zlgo'
                }
            ]
    })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})