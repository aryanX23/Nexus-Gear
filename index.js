// const path = require("path");
require("dotenv").config();

const connectMongoDb = require("./middlewares/mongoose");

const { PORT = 8000 } = process.env || {};
// Package Import and variable initializations

// const buildPath = path.normalize(path.join(__dirname, './views/build'));
// app.use(express.static(buildPath));

//Database Connection and Server Initialization
const db = connectMongoDb();

db.on('error', (err) => {
    console.log('Mongoose error', err);
});

db.once('open', async () => {
    const setupExpress = require('./configs/express');
    const app = setupExpress();

    app.set('port', PORT);
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}!`);
    });

    console.log(`Connected to DB!`);
});
