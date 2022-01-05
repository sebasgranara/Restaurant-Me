const isLoggedIn = (req, res, next) => {
  if (req.session.logged) {
    next();
  } else {
    res.redirect('/login');
  }
};

// agregado
const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect('/');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
