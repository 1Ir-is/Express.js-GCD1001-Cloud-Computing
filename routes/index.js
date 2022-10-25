var express = require('express');
var router = express.Router();
var authen = require('../models/authenticator');
var display_product = require('../models/table_display');
var gen_box = require('../models/select_box');
var crud = require('../models/crud');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN SHOP' });
});
// Process for Post request here
router.post('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP', message: "Please input username and password" });
});



// Process for login POST request
router.post('/login', async function(req, res, next) {
  let username =req.body.username;
  let password =req.body.password;
  session = req.session;
  console.log(username + ":" + password)

  let [authenticated, shop_id, role] = await authen(username, password);
  if(authenticated == true & role == 'shop'){
    session.user_id = username;
    session.shop_id = shop_id;
    session.role = role;
    res.redirect('/users');
  }
  else if(authenticated == true & role == 'director'){
    session.user_id = username;
    session.shop_id = shop_id;
    session.role = role;
    res.redirect('/admin');
  }
  else{
    res.render('login', { title: 'ATN SHOP', message: 'wrong user password' });
  }

});

router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('index', {title: 'ATN SHOP'});
});


module.exports = router;


