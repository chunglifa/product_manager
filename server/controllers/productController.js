console.log('petController.js')
const mongoose = require('mongoose');
var Product = mongoose.model('Product');
var productCounter = Number;
var deletedNum = 0;
var highestID = 5;
console.log(deletedNum);
console.log('product counter', productCounter);

module.exports = {
    getProducts: function (req, res) {
        console.log('getProducts() at productController.js');
        Product.find({}, function (err, products) {
            if (err) {
                console.log('error bringing in products @ petController.js');
            }
            else {
                console.log('found products @productController.js', products);
                res.json({ status: true, message: 'found products', data: products });
            }
        });
    },
    findProduct: function (req, res) {
        console.log('findProduct() @productController.js with', req.params.id);
        Product.findOne({ productid: req.params.id }, function (err, product) {
            if (err) {
                console.log('Could not find product');
                res.json({ status: false, message: 'could not find product', error: err });
            }
            else {
                console.log('Found product @petController.js =>', product);
                res.json({ status: true, message: 'found product', data: product });
            }
        })
    },
    addProduct: function (req, res) {
        console.log("POST DATA", req.body);
        console.log('Deleted Num val', deletedNum);
        Product.count({}, function (err, total) {
            if (err) {
                console.log('error counting', err);
            }
            else {
                console.log('Total number of products', total);
                productCounter = total;
                console.log(productCounter);
                if (productCounter < highestID) {
                    productCounter = highestID;
                    highestID = highestID +1; 
                } else {
                    highestID = productCounter;
                }
            }
        });
        console.log(productCounter);
        console.log('HIGHEST ID', highestID);
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            productid: highestID
        });
        console.log(product);
        //CHECK if exists already:
        console.log('search for product with name =>', product.name);
        Product.findOne({ name: req.body.name }, function (err, product) {
            if (product) {
                console.log(product);
                console.log('Found a product with name', product);
                res.json({ status: false, message: "found product with same name" });
            }
            else {
                var productSave = new Product({
                    name: req.body.name,
                    price: req.body.price,
                    qty: req.body.qty,
                    productid: productCounter
                });
                console.log('Save pet with data', productSave);
                productSave.save(function (err) {
                    if (err) {
                        console.log('ERROR @ petController.js', err)
                        res.json({ status: false, message: "Error adding product", error: err });
                    }
                    else {
                        console.log('successfully added pet at petController.js');
                        res.json({ status: true, message: "Successfully added product" });
                    }
                });
            }
        });
    },
    editProduct: function (req, res) {
        console.log('Update function @ productController.js');
        console.log('Product data', req.body);
        console.log('Product id', req.params.id);
        Product.findOne({ productid: req.params.id }, function (err, product) {
            if (err) {
                console.log('Error, product not found', err);
            }
            else {
                    product.name = req.body.name,
                    product.price = req.body.price,
                    product.qty = req.body.qty,
                    product.save(function (err) {
                        if (err) {
                            console.log('error updating pet', product);
                            res.json({ status: false, message: "error updating product" });
                        } else {
                            console.log('succesfully updated product');
                            res.json({ status: true, message: "successfully updated product" });
                        }
                    })

            }
        })
    },

    delete: function (req, res) {
        console.log('delete() @ productController.js with ID =>', req.params.id);
        Product.findOne({productid: req.params.id}, function(err, product) {
            if (err) {
                console.log('Could not find product', err);
            } else if (product.qty > 1) {
                console.log('Cannot delete a product that has inventory')
                res.json({status: false, message: "cannot delete product that has inventory"});

            } else{
                Product.findOneAndRemove({ productid: req.params.id }, function (err) {
                    if (err) {
                        console.log('error deleting @productController.js', err);
                        res.json({ status: false, message: "failed to delete product" })
                    }
                    else {
                        console.log('succesfully deleted product')
                        deletedNum = deletedNum + 1;
                        console.log(deletedNum);
                        res.json({ status: true, message: "succesfully deleted pet" });
                    }
                })
            }

        })

    }
}