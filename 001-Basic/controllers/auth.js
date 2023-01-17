exports.getLogin = (req, res, next) => {
    let isLoggedIn;
    if (req.get('Cookie') !== undefined) {
        isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
    } else {
        isLoggedIn = false;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn
    });
};


exports.postLogin = (req, res, next) => {
    // req.isLoggedIn = true; Expires, Max-Age , Domain,Secure
    res.setHeader('Set-Cookie', 'loggedIn=true; Secure');
    res.redirect('/');
};