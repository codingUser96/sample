var express = require('express');
var router = express.Router();
var Sequelize = require("sequelize");
var Product = require('../models/product');
const Op = Sequelize.Op

// To Add Product
router.post('/addProduct', function (req, res) {
    var product = {};
    var description = req.body.description;
    var price = req.body.price;
    var status = req.body.status;
    var balanceAmount = req.body.balance;
    var customerMobile = req.body.customerMobile;
        if (!description || !price || !status) {
            res.status(401).send({ success: false, code: 401, message: 'Please Enter Required Fields' });
        } else {
            product = {
                description: description,
                price: price,
                status: status,
                balanceAmount: balanceAmount,
                customerMobile: customerMobile
            }
            addProduct(product);
        }

        function addProduct(product) {
            Product.create(product).then(function (result) {
                res.send({success: true, code: 200, message: 'Product Added Succesfully'});
            }).catch(function (err) {
                console.log('err', err)
                res.status(500).send({ success: false, code: 500, Error: err, message: "Try Catch Error" });
            });
        }
});

// To Update Product
router.post('/updateProduct', function (req, res) {
    var product = {};
    var id = req.body.id;
    var description = req.body.description;
    var price = req.body.price;
    var status = req.body.status;
    var balanceAmount = req.body.balance;
    var customerMobile = req.body.customerMobile;
        if (!description || !price || !status) {
            res.status(401).send({ success: false, code: 401, message: 'Please Enter Required Fields' });
        } else {
            product = {
                description: description,
                price: price,
                status: status,
                balanceAmount: balanceAmount,
                customerMobile: customerMobile
            }
            updateProduct(product);
        }

        function updateProduct(product) {
            Product.update( product, { where: { id: id }} ).then(function (result) {
                res.send({success: true, code: 200, message: 'Product Updated Succesfully'});
            }).catch(function (err) {
                console.log('err', err)
                res.status(500).send({ success: false, code: 500, Error: err, message: "Try Catch Error" });
            });
        }
});

// To Delete Product
router.get('/deleteProduct', function (req, res) {
    var id = req.query.id;
        if (!id) {
            res.status(401).send({ success: false, code: 401, message: 'Please Pass Product ID' });
        } else {
            deleteProduct(id);
        }

        function deleteProduct(id) {
            var product = {
                where: {id: id}
            }
            Product.destroy(product).then(function (result) {
                if(result) {
                    res.send({success: true, code: 200, message: 'Product Deleted Succesfully'});
                } else {
                    res.send({success: true, code: 500, message: 'Product Not Found'});
                }
            }).catch(function (err) {
                console.log('err', err)
                res.status(500).send({ success: false, code: 500, Error: err, message: "Try Catch Error" });
            });
        }
});

// To list/view Product
router.get('/listProduct', function (req, res) {
    var offset = parseInt(req.query.offset) || 1;
    var limit = parseInt(req.query.limit) || 10;
    var search = req.query.search;

    const startIndex = (offset-1) * limit;
    const endIndex = offset * limit;
    if(search) {
        var whereClause = {
            description: { [Op.like]: '%' + search + '%' }
        }
    } else {
        var whereClause = {}
    }
    Product.findAll({
        where: whereClause,
        order: [['createdAt', 'desc']],
        offset: startIndex, limit: endIndex,
    }).then(function (product) {
        if (product.length >= 0) {
            res.status(200).send({ success: true, data: product, totalCount: product.length, message: 'Product List Retrieved Successfully.' });
        } else {
            res.status(201).send({ success: false, data: [], totalCount: 0, message: 'No Products found.' })

        }
    }).catch(function (err) {
        res.status(500).send({ success: false, Error: err, message: 'Try catch error.' });
        res.end();
    });
})


module.exports = router;
