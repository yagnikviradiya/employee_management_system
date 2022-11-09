const mongoose = require('mongoose');
const { mongodbUrl } = require('./config');

const mongodbConnection = async () => {
    try {
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('Database connected...');
    } catch (err) {
        console.log(err.message);
        console.log('Connection error');
    }
};
module.exports = mongodbConnection;