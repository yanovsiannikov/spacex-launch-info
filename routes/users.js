const express = require('express');
const router = express.Router();
const User = require('../models/users')


router.route('/login')
  .get((req, res) => {
    res.render('login', {login : 'active'});
  })
  .post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    const match = await user.comparePassword(password)
    if (!user) {
      res.render('login', { message: 'No such user' });
    } else if
      (!match) {
      res.render('login', { message: 'Incorrect Password' });
    } else {
      req.session.user = user;
      res.redirect('/');
    }

  });

router.route('/signup')
  .get((req, res) => {
    res.render('register',{reg : 'active'});
  })
  .post(async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      await user.save();
      req.session.user = user;
      res.redirect('/');
    }
    catch (error) {
      res.render('register', { message: 'Nickname or Email already exists!' });
    };
  });

router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      await req.session.destroy();
      res.redirect('/');
    }
    catch (error) {
      next(error);
    }
  } else {
    res.redirect('/users/login');
  }
});

module.exports = router;
