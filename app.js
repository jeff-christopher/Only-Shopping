/**
 * Core node packages 
 */
const path = require('path');

/**
 * Third party Node packages
 */
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

/**
 * Express app initalization
 */
const app = express();

/**
 * Html templating engine configuration
 */
app.set('view engine', 'ejs');
app.set('views', 'views');

const errorController = require('./controllers/error');

/**
 * My routes
 */
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404View);

/**
 * Sequilize sync
 */

sequelize.sync()
    .then(
        response => {
            app.listen(3000);
        }
    )
    .catch(
        error => {
            console.log(error);
        }
    );