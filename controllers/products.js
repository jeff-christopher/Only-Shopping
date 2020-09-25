const Product = require('../models/product');

exports.getShopView = async(req, res, next) => {
    const User = req.user;
    try {
        const products = await User.getProducts();
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    } catch (error) {
        console.log(error);
    }
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

exports.addProduct = async(req, res, next) => {
    const User = req.user;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;

    try {
        await User.createProduct({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
        });
        res.redirect('/admin/products');

    } catch (error) {
        console.log(error);
    }

};

exports.getProductsView = async(req, res, next) => {
    const User = req.user;

    try {
        const products = await User.getProducts();
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
        });
    } catch (error) {
        console.log(error);
    }

};

exports.deleteProduct = async(req, res, next) => {
    const productId = +req.params.id;
    const User = req.user;
    try {
        const product = await User.getProducts({ where: { id: productId } });
        await User.removeProduct(product);

        res.redirect('/admin/products');

    } catch (error) {
        console.log(error);
    }
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

exports.productsList = async(req, res, next) => {
    const User = req.user;
    try {
        const products = await User.getProducts();
        res.render('shop/product-list', {
            pageTitle: 'Products',
            path: '/products',
            products: products,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.productDetails = async(req, res, next) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByPk(productId);
        res.render('shop/product-detail', {
            pageTitle: 'Product detail',
            path: '/products',
            product: product,
        });
    } catch (error) {
        console.log(error);
    }
};