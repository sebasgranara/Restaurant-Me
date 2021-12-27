const isLoggedIn = (req, res, next) => {
  if (req.session.logged) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = {
  isLoggedIn,
};
