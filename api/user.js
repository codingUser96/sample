var express = require('express');
var router = express.Router();
var User = require('../models/user');
var helpers = require("../helpers/helpers");
var jwt = require('jsonwebtoken');
var config = require('../config/config')

// User Registration
router.post('/register', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
        if (!email || !password) {
            res.status(401).send({ success: false, code: 401, message: 'Please pass Email and Password.' });
        } else if (password.length < 8) {
            res.status(401).send({ success: false, code: 401, message: 'Password must be 8 characters' });
        } else {
            signup();
        }
    function signup() {
        helpers.checkEmailExist(email, function (result, err) {
            if (err) {
                res.status(500).send({ success: false, code: 500, Error: err, message: 'EmailID Checking Failed' });
                res.end();
            } else if (result) {
                res.status(401).send({ success: false, code: 401, message: 'EmailID Already Exists' });
            } else {
            options = {
                name: name,
                email: email,
                password: password,
            }
                helpers.cryptPassword(password, function (err, hashPassword) {
                    options.password = hashPassword;
                    userCreation(options)
                })
            }
        });
    }
    function userCreation(options) {
        User.create(options).then(function (result) {
            res.send({success: true, code: 200, message: 'Registered Succesfully'});
        }).catch(function (err) {
            console.log('err', err)
            res.status(500).send({ success: false, code: 500, Error: err, message: "Try Catch Error" });
        });
    }
});


// User Login
router.post('/login', function (req, res) {
    console.log(req.body.email)
    var password = req.body.password;
    var email = req.body.email;
    var userId = '';
    if (!email || !password) {
        res.status(401).send({ success: false, code: 401, message: 'Please pass email and password.' });
    } else {
        login();
    }
    function login() {
        if (email) {
            var options = {
                where:
                    { email: email.toLowerCase() }            }
        }
        User.findOne(options).then(function (user) {
            if (!user) {
                res.status(401).send({ success: false, code: 401, message: 'Email/Password is Invalid' });
            } else {
                helpers.comparePassword(password, user.password, function (err, isMatch) {
                    if (isMatch) {
                        // return the information including token as JSON
                        // loginTime(user, deviceId, res, 'Logged in');
                        User.findOne(options).then(function (user) {
                            if (user) {
                                userId = user.id
                            }
                        });
                        var token = jwt.sign(user.toJSON(), config.options.secret);

                        res.status(200).send({ success: true, code: 200, userId: userId, token: 'JWT' + token, message: 'Logged In' });
                    } else {
                        res.status(401).send({ success: false, code: 401, message: 'Email/Password is Invalid' });
                    }
                });
            }
        });
    }
});

module.exports = router;
