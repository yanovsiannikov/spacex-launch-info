const express = require('express');
const router = express.Router();
const User = require('../models/users')


router.route('/login')
  .get( (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;

    const user = await User.findOne({ username });
    if (!user) {
      res.redirect('/users/login');
    } else if (user.password !== password) {
      res.redirect('/users/login');
    } else {
      req.session.user = user;
      res.redirect('/channels');
    }

});

router.route('/signup')
  .get( (req, res) => {
    res.render('signup');
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
      res.redirect('/channels');
    }
    catch (error) {
      res.redirect('/users/signup');
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

router.route('/:id')
  .get(async (req, res, next) => {
    let channels = await Channel.find({"subscribers" : req.params.id})
    let cost = channels.reduce((a,b) => {return a + b.cost},0)
    console.log('test '+cost)
    res.render('profile', {channels, cost})
})

module.exports = router;
