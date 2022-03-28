import "dotenv/config";
import connect from "./config/database";
import express from "express";
import cors from "cors";
import router from "./routes";
connect();

const app = express();
app.use(express.json());
app.use(cors());

//API Routes
app.use("/api", router);

const port = process.env.PORT || 5000;

// server listening
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
