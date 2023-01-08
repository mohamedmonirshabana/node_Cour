const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

const rootDir = require('./util/path');

const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("63b6a274e9e75e642bb4e97f")
        .then(user => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes.routs);
app.use(shopRoutes);


app.use(errorController.get404);

mongoose.connect('mongodb+srv://medo:ASD-123456@cluster0.wongn.mongodb.net/ShopDB').then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});