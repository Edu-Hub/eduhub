const mongoose = require("mongoose");

const dbConnect = async () => {
    console.log("here")
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

export default dbConnect;
