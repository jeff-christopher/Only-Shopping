const path = require('path');

const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');
router.get('/', productsController.getShopView);
router.get('/products', productsController.productsList);
router.get('/product-details/:id', productsController.productDetails);

module.exports = router;