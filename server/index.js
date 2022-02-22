require("dotenv").config(); //module that loads environment variables from a .env file into process.env
require("./config/database").connect();
const http = require("http");
const express = require("express");
const userRoutes = require("./routes/user");
const contactRoutes = require("./routes/contact");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


// const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


const router = express.Router();
app.use(router)
app.use("/user", userRoutes)
app.use("/api", contactRoutes)

const { API_PORT } = process.env;
const port = process.env.PORT || 5000;

// server listening 
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
}); 