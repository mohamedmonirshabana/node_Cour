const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoConnect = require('./util/database');

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
app.use(express.static(path.join(__dirname, 'js')));

app.use('/admin', adminRoutes.routs);
app.use(shopRoutes);


app.use(errorController.get404);

mongoConnect((client) => {
    console.log(client);
    app.listen(3000);
})