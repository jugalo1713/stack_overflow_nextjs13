import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("missing MONGODB_URL");
  }

  if (isConnected) {
    return console.log("MongoDb is connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    });
    isConnected = true;
    console.log("Mongo is connected");
  } catch (error) {
    console.log("MongoDb connection error", error);
  }
};
