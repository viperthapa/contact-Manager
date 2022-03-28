import mongoose from "mongoose";
import config from "../config/auth";

const connect = () => {
  // Connecting to the database
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      process.exit(1);
    });
};
export default connect;
