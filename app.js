var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    cons = require('consolidate'),
    expressValidator = require('express-validator'),
    controllers = require('./controllers'),
    Config = require('./config'),
    config = new Config();

var app = express();

app.enable("jsonp callback");
app.use(logger(':remote-addr :method :url :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.engine('html', cons.swig);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('static'));

app.use('/', require('./routes/index')());

app.set('port', process.env.PORT || config.appPort);

var server = app.listen(app.get('port'), function () {
    console.log('Feedbooster listening on port ' + server.address().port);
});