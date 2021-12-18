const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const usersAPI = require("./routes/user-api");
const sessionAPI = require("./routes/session-api");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/budget-web')));
app.use('/', express.static(path.join(__dirname, '../dist/budget-web')));

/**
 * Variables
 */
const port = process.env.PORT || 3000;

const conn = 'mongodb+srv://admin:IdC3QeTdW3kevaw2@cluster0.yiwmb.mongodb.net/budget?retryWrites=true&w=majority'; //Mongoose connection string

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.debug('Connection to the database instance was successful');
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * APIs
 */
app.use('/api/users', usersAPI)
app.use('/api/session', sessionAPI)


/**
 * Create and start server
 */
app.listen(port, () => {
  console.log('Server started and listening on port: ' + port);
})
