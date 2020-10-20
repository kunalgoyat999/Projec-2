
const fs = require('fs')
const mongoose  = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourmodel.js');

dotenv.config({path: './config.env'});


const DB = process.env.DATABASE_LOCAL(
    '<PASSWORD>',
 process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then( () => console.log('DB Connection succesfully '));

const tours = JSON.parse(fs.readFileSync(`./4-natours/starter/dev-data/data/tours-simple`, 'utf-8'));

// Importing Data from DB

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('DATA SUCCESSFULLY LOADED')
    }
    catch (err) {
        console.log(err)
    }
}


// DELETING DATA FROM DB

const deleteData = async () => {
    try{
        await Tour.deleteMany(tours);
        console.log('DATA SUCCSESSFULLY DELETED')
    } catch (err) {
        console.log(err)
    }
}

console.log(process.argv);

