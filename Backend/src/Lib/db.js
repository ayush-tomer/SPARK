import mongoose from "mongoose";

const ConnectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongoose connected to Database`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server issue", error: true });
  }
};

export default ConnectDB;
