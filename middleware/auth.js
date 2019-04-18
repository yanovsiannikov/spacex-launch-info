const hbs = require('hbs');

hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerHelper('ifIn', function(elem, list, options) {
    if(list.indexOf(elem) > -1) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

hbs.registerHelper('if_not', function (elem, list, opts) {
    if (list.indexOf(elem) === -1) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

function cookiesCleaner(req, res, next) {
    console.log('middleware func');
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
}

const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/channels');
    } else {
        next();
    }
};

module.exports = {
    sessionChecker,
    cookiesCleaner
}