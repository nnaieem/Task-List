const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// var databaseToUse = "";

// if (process.env.NODE === "production") {
//     app.use(express.statis('client/build'));
//     databaseToUse = "mongodb://nnaieem:password1@ds155626.mlab.com:55626/heroku_tmsvvzzt";
// }
// else {
//     databaseToUse = 'mongodb://localhost/reactBoilerplate';
// }

// app.use('/api/items', items);

// const MONGODB_URI = process.env.MONGODB_URI || databaseToUse;

// mongoose.Promise = global.Promise;

// mongoose.connect(MONGODB_URI);

// app.listen(PORT, function () {
//   console.log(`App running on port ${PORT}`);
// });





// DB Config
const db = require('./config/webconfig').mongoURI;

// Connect to Mongo
mongoose.connect(db) // return a promise
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log('MongoDB Error', err));

const port = process.env.PORT || 5000;

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

                 //callback
app.listen(port, () => console.log(`Server started on port ${port}`));
