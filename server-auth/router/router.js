const auth = require('../controllers/auth');
const passportService = require('../services/passport'); //execute passportService
const passport = require('passport');

// middleware intercepts req and connects to route
// incoming req ---> requireAuth ---> route
// intercept incoming req, verify if auth'd, if auth'd connect to route

// use jwt Strategy
const requireAuth = passport.authenticate('jwt', {session: false});
// use local Strategy
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function router(app) {
  app.get('/', requireAuth, function (req, res, next) {
    res.send({ message: 'Secret Code is 123ABC'});
  });
  app.get('/signup', function (req, res, next) {
    res.send(`at '/signup'`);
  });
  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);
};
