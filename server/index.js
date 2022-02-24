require("dotenv").config(); //module that loads environment variables from a .env file into process.env
require("./config/database").connect();
const express = require("express");

// routes
const routes = require("./routes")
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use('/api',routes);
const port = process.env.PORT || 5000;

// server listening 
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
}); 

