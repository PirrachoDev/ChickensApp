const User = require('../models/users');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
}

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const newUser = User.build({ username, email });
    console.log(newUser);
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, error => {
      if (error) return next(error);
      req.flash('success', 'Welcome to Pollos Hermanos');
      res.redirect('/chickens');
    });
  } catch (error) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
}