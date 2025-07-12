import mongoose from 'mongoose';

export const ConnectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo DB Connected : ${con.connection.host}`);
    }
    catch(error) {
        console.error("Error: ",error.message);
        process.exit(1);
    }
}