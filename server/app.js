var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var csrf = require('csurf');
var routes = require('./routes/index');
var Resource = require('express-resource');
var crypto = require('crypto');
var models = require('./models.js')
var gm = require('gm');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'randomstring' }))

/*app.use(csrf());
app.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();

});*/
app.use('/', routes);

app.use(express.static(path.join(__dirname, '../')));
app.use(logger('dev'));

app.post('/login', function(req, res) {
  var query = {
      'email': req.body.user, 
      'password': crypto.createHash('md5').update(req.body.password).digest('hex')
    };
  models.User.find({ 
    where: query
  }).success(function(result) {
      if (result !== null) {
        req.session.user_id = result.id;
        res.json({success: true, result: result});
      } else {
        res.json({success: false, msg: 'User not found'});
      }
    });
});
 
app.get('/logout', function(req, res) {
  req.session.authed = null;
  res.json({success: true});
});

app.resource('users', require('./resources/users'));
app.resource('groups', require('./resources/groups'));
app.resource('resources', require('./resources/resources'));

app.resource('bugs', require('./resources/bugs'));
app.resource('categories', require('./resources/categories'));
app.resource('versions', require('./resources/versions'));

app.get('/menu', require('./menu.js').get);


// charts
app.get('/charts/bugsByCategory', require('./charts/bugs').bugsByCategory);
app.get('/charts/bugsByTime', require('./charts/bugs').bugsByTime);
app.get('/charts/bugsProgress', require('./charts/bugs').bugsProgress);
app.get('/charts/bugsCumulativeByTime', require('./charts/bugs').bugsCumulativeByTime);


// reports
app.get('/reports/bugs', require('./reports/bugs').index);

// turns an svg file in the post into a png and returns it
// note that the svg must have size attributes, and the 
// post must include width and height for output
// requires GraphicsMagick to be installed
app.post('/png', function(req, res) {
  var buf = new Buffer(req.body.svg, 'utf-8');
  gm(buf, 'charts.svg')
  .options({imageMagick: true})
  .resize(req.body.width, req.body.height)
  .stream('png', function (err, stdout, stderr) {
    if (err) {
      res.status(500)
      res.setHeader('Content-Type', 'text/plain')
      stderr.pipe(res);
    } else {
      res.setHeader('Content-Disposition', 'attachment;filename="chart.png"');
      res.setHeader('Content-Type', 'image/png');
      stdout.pipe(res);
    }
  });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
