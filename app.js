/**
 * Temporal
 */
const User = require('./models/user');

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
const Product = require('./models/product');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Middlewares
 */
app.use(async(req, res, next) => {
    req.user = await User.findByPk(1);
    next();
});

/**
 * RoutesMiddlewares
 */
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404View);

/**
 * Define relations between models
 */

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

/**
 * Sequilize sync
 * Create all models in case it's needed.
 */

sequelize.sync({ force: false })
    .then(
        response => {
            return User.findByPk(1);
        }
    )
    .then(
        user => {
            if (!user) {
                return User.create({
                    name: 'Jeff',
                    email: 'jeff.ortiz@dev.test',
                });
            } else {
                return user;
            }
        }
    )
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