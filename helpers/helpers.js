var User = require("../models/user");
var bcrypt = require('bcrypt');

var helpers = {
    cryptPassword: function (password, callback) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err)
                return callback(err);

            bcrypt.hash(password, salt, function (err, hash) {
                return callback(err, hash);
            });
        });
    },
    comparePassword: function (plainPass, hashword, callback) {
        bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
            return err == null ?
                callback(null, isPasswordMatch) :
                callback(err);
        });
    },
    checkEmailExist: function (email, callback) {
        if (email) {
            var options = {
                where:
                    { email: email.toLowerCase() }
            }
            User.findOne(options).then(function (user) {
                // If email exists return true 
                if (user) {
                    return callback(true, '', user);
                } else {
                    return callback(false);
                }
            }).catch(function (err) {
                return callback(false, err);
            });
        } else {
            return callback(false);
        }
    },
}

module.exports = helpers
