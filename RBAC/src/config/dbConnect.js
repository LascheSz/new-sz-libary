const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`MongoDB connected: ${connect.connection.host}, ${connect.connection.name}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = dbConnect;