var express = require('express');
var router = express.Router();

var User = require('../Controller/userController');
// var CategoryController = require('../Controller/categoryController');
// var ProductController = require('../Controller/productController');
// var SupplierController = require('../Controller/supplierController');
// var SetupController = require('../Controller/lutSetupController');
// var CustomerController = require('../Controller/customerController');
// var SearchController = require('../Controller/searchController');



var passport = require('passport');
var multer=require('multer');
var upload=multer({dest:'uploads/'});
var type=upload.single('upfile');
var async = require('asyncawait/async');
var await = require('asyncawait/await');

app.get('/logout', function(request, response) {
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


router.post('/addUser', type,function(req, res) {
    var AddUser = async (function (){
        User.addUser(req,res);
    });
    AddUser();
});


router.post('/editUser', type,function(req, res) {
    var EditUser = async (function (){
        await (User.editUser(req,res));
    });
    EditUser();
});

router.get('/getAllUsers', type,function(req, res) {
    var GetAllUsers= async (function (){
        await (User.getAllUsers(req,res));
    });
    GetAllUsers();
});

router.get('/getActiveUsers', type,function(req, res) {
    var GetActiveUsers= async (function (){
        await (User.getActiveUsers(req,res));
    });
    GetActiveUsers();
});



module.exports = router;
