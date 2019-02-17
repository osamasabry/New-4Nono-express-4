var express = require('express');
var router = express.Router();

var UserController  = require('../Controller/AccountController/userController');
// var TagController   = require('../Controller/tagController');
// var CategoryController = require('../Controller/categoryController');
// var PostController = require('../Controller/postController');
// var MediaController = require('../Controller/mediaController');
// var CustomerController = require('../Controller/customerController');
// var SearchController = require('../Controller/searchController');

var passport = require('passport');
var multer=require('multer');
var upload=multer({dest:'uploads/'});
var type=upload.single('image');
var async = require('asyncawait/async');
var await = require('asyncawait/await');



router.get('/logout', function(request, response) {
	request.logout();
	response.redirect('/');
});


router.post('/login', type,function(req, res, next) {
      passport.authenticate('login', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send(info); }
        req.logIn(user, function(err) {
          if (err) { return next(info); }
          return res.send(user);
        });
      })(req, res, next);
});


/****************User****************/
router.post('/addUser', type,function(req, res) {
    var AddUser = async (function (){
        UserController.addUser(req,res);
    });
    AddUser();
});


router.post('/editUser', type,function(req, res) {
    var EditUser = async (function (){
        await (UserController.editUser(req,res));
    });
    EditUser();
});

router.get('/getAllUsers', type,function(req, res) {
    var GetAllUsers= async (function (){
        await (UserController.getAllUsers(req,res));
    });
    GetAllUsers();
});

router.get('/getActiveUsers', type,function(req, res) {
    var GetActiveUsers= async (function (){
        await (UserController.getActiveUsers(req,res));
    });
    GetActiveUsers();
});



module.exports = router;
