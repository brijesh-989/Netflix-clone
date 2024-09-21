import mongoose from "mongoose";

import { ENV_VARS } from "./envVar.js";
export const connectDB = async () => {
  try {
    mongoose.connect(ENV_VARS.MONGO_URI);
    const conn = mongoose.connection;
    conn.once("open", () => {
      console.log("successfully connected ");
    });
  } catch (error) {
    console.log("err");
    console.log("Error connection " + error.message);
  }
};
