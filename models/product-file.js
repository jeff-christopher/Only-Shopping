const fs = require('fs');
const path = require('path');

const filePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);


const readProductsFile = () =>
    new Promise((res, rej) => {
        fs.readFile(filePath, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data);
            }
            res(products);
        });
    });

const writeProductsFile = newProducts =>
    new Promise((res, rej) => {
        fs.writeFile(filePath, JSON.stringify(newProducts), (err) => {
            if (!err) {
                res(true);
            }
        });
    });


class Product {

    constructor(title, imageUrl, price, description) {
        this.id = Math.random();
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    async saveProduct() {
        const products = await readProductsFile();
        const productsUpdated = [...products];

        productsUpdated.push(this);

        const saved = await writeProductsFile(productsUpdated);
        return saved;
    }

    static async saveProduct(product) {
        const products = await readProductsFile();
        const productsUpdated = [...products];

        if (product) {
            const productIndex = products.findIndex((value) => value.id === product.id);
            productsUpdated[productIndex] = product;
        }

        const saved = await writeProductsFile(productsUpdated);
        return saved;
    }

    static async fetchAllProducts() {
        const products = await readProductsFile();
        return products;
    }

    static async getProductById(id) {
        const products = await readProductsFile();
        const product = products.find((product) => product.id === id);
        return product;

    }

    static async deleteProduct(id) {
        const products = await readProductsFile();
        const productsUpdated = products.filter(product => product.id !== id);
        const deleted = await writeProductsFile(productsUpdated);
        return deleted;
    }

    static async editProduct(id, title, imageUrl, price, description) {
        this.getProductById(id).then(
            product => {
                product.title = title;
                product.imageUrl = imageUrl;
                product.price = price;
                product.description = description;
                return this.saveProduct(product);
            }
        ).then(
            saved => saved
        );
    }

}

module.exports = Product;