const express = require("express");
require("dotenv").config();
var cors = require("cors");
const app = express();
const { connectMongoDB } = require("./middlewares/mongoose");
const port = process.env.PORT || 8000;
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const refreshRoutes = require('./routes/refreshRoute');
const paymentRoutes = require('./routes/paymentRoutes');
const logoutRoutes = require('./routes/logoutRoutes');
const verifyJWT = require('./middlewares/verifyJWT');
const path = require("path");

// Package Import and variable initializations
const buildPath = path.normalize(path.join(__dirname, './views/build'));
app.use(express.static(buildPath));
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
app.get('/', (req, res) => {
    res.send("Server Working!!");  
});
app.use('/api/refresh', refreshRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(verifyJWT);
app.use('/api/payments', paymentRoutes);
app.use('/api/logout', logoutRoutes);
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