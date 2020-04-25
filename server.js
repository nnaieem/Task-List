const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
