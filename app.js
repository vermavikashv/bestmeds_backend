var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var subcategoriesRouter = require('./routes/subcategories');
var brandRouter = require('./routes/brand');
var productsRouter = require('./routes/products');
var loginRouter = require('./routes/login');
var productimagesRouter = require('./routes/productimages');
var bannerRouter = require('./routes/banner');
var coupanRouter = require('./routes/coupan');
var userregRouter = require('./routes/userreg');
var apiRouter = require('./routes/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/subcategories', subcategoriesRouter);
app.use('/brand', brandRouter);
app.use('/products', productsRouter);
app.use('/login', loginRouter);
app.use('/productimages', productimagesRouter);
app.use('/banner', bannerRouter);
app.use('/coupan', coupanRouter);
app.use('/userreg', userregRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
