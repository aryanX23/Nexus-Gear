const express = require("express");
require("dotenv").config();
var cors = require("cors");
const app = express();
const { connectMongoDB } = require("./middlewares/mongoose");
const port = process.env.PORT || 8000;
const productRoutes = require('./routes/productRoutes');
// Package Import and variable initializations

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        credentials: true,
        origin: process.env.ORIGIN_URL,
    })
);
// Middleware Initializations

//Start Of Routes
app.get("/", (req, res) => {
    res.send("Server Working!!"); 
});
app.use('/api/products', productRoutes);
//End Of Routes

//Database Connection and Server Initialization
connectMongoDB(process.env.MONGO_URI || "")
    .then((result) => {
        const server = app.listen(port, () => {
            console.log(
                "Server is successfully running on port " + port + " !!"
            );
        });
}).catch(console.log);