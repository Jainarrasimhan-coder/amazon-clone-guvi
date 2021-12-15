import mongoose from 'mongoose';



const Connection = async(username, password) => {
    const URL = process.env.MONGO_URI
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, })
        console.log('Mongodb amazon  connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;