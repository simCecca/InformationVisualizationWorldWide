const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('config');

const app = express();

//for easy take request and sharing data with the body
app.use(express.json());//Bodyparser Middleweare

//for mongoDB
const mongoose = require('mongoose');
const db = config.get('databaseURL');//take the database from mongodb atlas

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true
    }) // Adding new mongo url parser
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



//Use Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/companies',require('./routes/api/companies'));
app.use('/api/auth',require('./routes/api/auth'));

//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server started on port '+ port));


module.exports = app;
