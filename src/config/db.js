const mongoose = require('mongoose');
const config = require('./index');

const mongoDbUrl = config.MONGODB_URI;

//function that handles the database connection
module.exports = async () => {
    try {
        const connected = await mongoose.connect(
            mongoDbUrl, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            }
        );
        if (connected) {
            console.log(`Mongoose connection is open... Database connected successfully!`);
        }
    } catch (error) {
        console.log('Error from database connection >>>>', error);
    }
};
