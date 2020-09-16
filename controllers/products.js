const Product = require('../models/product');

exports.getShopView = (req, res, next) => {
    Product.fetchAllProducts()
        .then((products) => {
            res.render('shop', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
        });
};

exports.getAddProductView = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, price, description);
    product.saveProduct()
        .then((saved) => {
            res.redirect('/admin/products');
        });
};

exports.getProductsView = (req, res, next) => {
    Product.fetchAllProducts().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    });
};

exports.deleteProduct = (req, res, next) => {
    const productId = +req.params.id;
    Product.deleteProduct(productId)
        .then((deleted) => {
            res.redirect('/admin/products');
        });
};

exports.editProduct = (req, res, next) => {
    const productId = +req.params.id;
};