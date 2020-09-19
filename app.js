const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./util/database');

/**
 * Models
 */

const Product = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize = require('./util/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404View);


sequelize.sync()
    .then(
        response => {
            console.log(response);
            app.listen(3000);
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    );