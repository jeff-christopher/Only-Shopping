const Product = require('../models/product');

exports.getShopView = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop', {
                prods: products,
                pageTitle: 'Shop',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getAddProductView = (req, res, next) => {
    res.render('admin/add-edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editMode: false,
    });
};

exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    Product.create({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
        })
        .then(saved => {
            res.redirect('/admin/products');
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getProductsView = (req, res, next) => {
    Product.findAll()
        .then(products => {
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

exports.getEditProductView = (req, res, next) => {
    const productId = +req.params.id;
    Product.findByPk(productId).then(
        product => {
            res.render('admin/add-edit-product', {
                path: '/admin/add-product',
                pageTitle: 'Edit product',
                editMode: true,
                product: product,
            });
        }
    ).catch(
        error => {
            console.log(error);
        }
    );
};

exports.editProduct = (req, res, next) => {
    const productId = +req.params.id;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    Product.update({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
    }, {
        where: {
            id: productId,
        }
    }).then(
        response => {
            res.redirect('/admin/products');
        }
    ).catch(
        error => {
            console.log(error);
        }
    );
};