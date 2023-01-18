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
    req.session.isLoggedIn = true;
    res.redirect('/');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy();
}