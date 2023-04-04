const express = require('express');
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

//users/register
router.post('/register', (req, res, next) => {
let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password })

User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register user'})
        } else {
            res.json({success: true, msg: 'User registered'})
        }

    })
    
})

router.post("/register", async (request, response) => {
    try {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password = Bcrypt.hashSync(request.body.password, 10)})
        let result = await user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});







//users/authenticate
router.post('/authenticate', (req, res, next) => 
res.send('Authenticate') )

//users/profile
router.get('/profile', (req, res, next) => 
res.send('Profile') )

//users/validate    
router.get('/validate', (req, res, next) => 
res.send('Validate') )

module.exports = router