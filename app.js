var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static("uploads"));


const customerRoute = require('./routes/customer-route');
const adminRoute = require('./routes/admin-route');


app.use('/customer', customerRoute);
app.use('/admin', adminRoute);



app.get('/',function (req, res) {
res.render('index')
});



app.listen(8000, function () {
  console.log('Listening to Port 8000');
});