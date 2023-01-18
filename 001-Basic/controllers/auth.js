const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // let isLoggedIn;
    // if (req.get('Cookie') !== undefined) {
    //     isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
    // } else {
    //     isLoggedIn = false;
    // }
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    });
};


exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true; Expires, Max-Age , Domain,Secure, HttpOnly
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    User.findById('63bbe4312707028454ad44a6').then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
            console.log(err);
            res.redirect('/');
        });
    }).catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}