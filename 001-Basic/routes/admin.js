const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});


router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

exports.routs = router;
exports.products = products;