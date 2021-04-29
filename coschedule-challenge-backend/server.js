var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Rating = require('./api/models/ratingModel'),
    User = require('./api/models/userModel'),
    bodyParser = require('body-parser');

//mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Gifdb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var gifRoutes = require('./api/routes/gifRoutes');
gifRoutes(app);
var ratingRoutes = require('./api/routes/ratingRoutes')

ratingRoutes(app);
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

app.listen(port);

console.log('GIF RESTful API server started on: ' + port);