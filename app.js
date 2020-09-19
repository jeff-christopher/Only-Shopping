const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const { Sequilize } = require('sequelize');
const mysql = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404View);


mysql.authenticate().then(
    (value) => {
        console.log('Succesfully Connected to DB.');
        app.listen(3000);
    }
).catch(
    (error) => {
        console.log('Something went work whiler trying to connect to DB.', error);
    }
)