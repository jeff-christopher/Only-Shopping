const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');


// /admin/add-product => GET
router.get('/add-product', productsController.getAddProductView);

// /admin/add-product => POST
router.post('/add-product', productsController.addProduct);

router.get('/products', productsController.getProductsView);

router.post('/delete-product/:id', productsController.deleteProduct);

router.get('/edit-product/:id', productsController.getEditProductView);

router.post('/edit-product/:id', productsController.editProduct);

module.exports = router;