const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // let isLoggedIn;
    // if (req.get('Cookie') !== undefined) {
    //     isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
    // } else {
    //     isLoggedIn = false;
    // }
    // console.log(req.session.isLoggedIn);
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: message
    });
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        errorMessage: message
    });
};


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                req.flash('error', 'Invalid Email or password.');
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                })
        })
        .catch(err => console.log(err));

    // req.isLoggedIn = true; Expires, Max-Age , Domain,Secure, HttpOnly
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    // User.findById('63bbe4312707028454ad44a6').then(user => {
    //     req.session.isLoggedIn = true;
    //     req.session.user = user;
    //     req.session.save(err => {
    //         console.log(err);
    //         res.redirect('/');
    //     });
    // }).catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = email.split('@')[0];
    const confirmPassword = req.body.confirmPassword;
    User.findOne({
            email: email
        }).then(userDoc => {
            if (userDoc) {
                req.flash('error', 'Email is Exist');
                return res.redirect('/signup');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        name: username,
                        email: email,
                        password: hashedPassword,
                        cart: {
                            items: []
                        }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login')
                });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}