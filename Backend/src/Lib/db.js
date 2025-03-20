import mongoose from "mongoose";
const Mongo_URI = process.env.MONGO_URI;

const ConnectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI || Mongo_URI);
    console.log(`Mongoose connected to Database`);
  } catch (error) {
    console.log(error);
  }
};

export default ConnectDB;
