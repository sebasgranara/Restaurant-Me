const express = require('express');
const handlebars = require('hbs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const { isLoggedIn } = require('./middlewares');

const { MONGO_URI } = require('./db/index');

const baseRoutes = require('./routes/base');
const restaurantsRoutes = require('./routes/restaurants.routes');

const authRouter = require('./routes/auth.routes');

// handlebars.registerPartials(`${__dirname}/views/partials`);
handlebars.registerPartials(path.join(__dirname + '/views/partials'));

function setupApp() {
  const app = express();
  app.set('view engine', 'hbs');
  // app.set("views", __dirname + "/pages");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: MONGO_URI,
        ttl: 24 * 60 * 60,
      }),
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );

  app.use('/', baseRoutes());

  app.use('/restaurants', isLoggedIn, restaurantsRoutes());

  app.use('/', authRouter);

  app.use((req, res) => {
    res.render('404.hbs');
  });

  app.use((error, req, res, next) => {
    let err;
    if (req.app.get('env') === 'development') {
      err = error;
    } else {
      err = {};
    }
    // req.app.get('env') === 'development' ? err : {};
    res.render('error', { message: error.message, error: err });
  });

  return app;
}

module.exports = setupApp;
