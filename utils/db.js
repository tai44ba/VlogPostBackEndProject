import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    mongoose.connection.on("error", (error) => {
      console.error("Failed to connect to MongoDB:", error);
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB Successfully!!");
    });

    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
