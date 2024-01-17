import mongoose from "mongoose";
const mongoURI = "mongodb://localhost:27017/talk";

export const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
