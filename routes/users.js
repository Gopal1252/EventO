const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req,res, next) =>{
    res.render('users/register');
})
router.post('/register', catchAsync(async (req,res) =>{
    try{
        const {email, username, password} = req.body;
        const user = new User({email,username});
        const registeredUser = await User.register(user,password);
        req.login(registeredUser, err =>{
            if(err) return next(err); //automatically logging in the user when they register
            req.flash('success','Welcome to EventO');
            res.redirect('/events');
        })
    }catch(e){
        console.log(e.message);
        req.flash('error',e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req,res) =>{
    res.render('users/login');
})
router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash : true, failureRedirect : '/login'}), catchAsync(async (req,res) =>{
    req.flash('success', 'Welcome Back!');
    const redirectUrl = res.locals.returnTo || '/events';
    delete res.locals.returnTo;
    res.redirect(redirectUrl);
}));

router.get('/logout', (req, res, next) =>{
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/events');
    });
})

module.exports = router; 