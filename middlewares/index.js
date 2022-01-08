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

/*{"cookie":{"originalMaxAge":86400000,"expires":"2022-01-09T11:10:59.514Z","httpOnly":true,"path":"/"},"logged":true,"user":{"_id":"61d3339838df8e6935c59bf4","email":"test@iron.com","hashedPassword":"$2a$10$n87XnSuZzqGTrjwzXSfNdudcaQ49csglyM0CMrvUkho/OT2ke09AC","createdAt":"2022-01-03T17:34:16.598Z","updatedAt":"2022-01-03T17:34:16.598Z","__v":0}} */