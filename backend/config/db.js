const mongoose = require('mongoose');
const { mongodbUrl } = require('./config');

const mongodbConnection = async () => {
    try {
        await mongoose.connect(mongodbUrl, {
            useCreateIndex: true,
            useNewUrlParser: true 
        });
        console.log('Database connected...');
    } catch (err) {
        console.log(err.message);
        console.log('Connection error');
    }
};
module.exports = mongodbConnection;