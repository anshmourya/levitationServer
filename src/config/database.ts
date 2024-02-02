import mongoose from "mongoose";

const database = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("connextd to the database");
  } catch (error) {
    console.error(error);
    throw new Error("Could not connect to database.");
  }
};

export default database;
