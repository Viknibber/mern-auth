const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected to database.');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDatabase;
