const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req,res) =>{
    res.render('users/register');
})
router.post('/register', catchAsync(async (req,res) =>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user,password);
        req.flash('success','Welcome to EventO');
        res.redirect('/events');
    }catch(e){
        console.log(e.message);
        req.flash('error',e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req,res) =>{
    res.render('users/login');
})
router.post('/login', catchAsync(async (req,res) =>{
}));

module.exports = router; 