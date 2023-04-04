const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User schema
const UserSchema = mongoose.Schema({
    name : {type:String},
    email : {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback)
}

module.exports.getUserByUsername = function(username, callback) {
    const query = {username: username}
    User.findOne(query, callback)
}

/*
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {                 //check brypct docs to encrypt password
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })

    })
}
*/


module.exports.UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
