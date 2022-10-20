var express = require('express');
var router = express.Router();
var authen = require('../modes/authenticator');
const display_products = require('../modes/table_display');
var gen_box = require('../modes/select_box');


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
  console.log(username + ":" + password)
  let [authenticated, shop_id, role] = await authen(username, password)
  if(authenticated == true & role == 'shop'){
    let table = await display_products(shop_id);
    res.render('users', { title: 'ATN SHOP',
                          name:username,
                          table_string: table });
  }
  else if(authenticated == true & role == 'director'){
    let box_string = gen_box();
    res.render('admin', { title: 'ATN SHOP',
                          name:username,
                          select_box: box_string});
  }
  else{
    res.render('login', { title: 'ATN SHOP', message: 'wrong user password' });
  }

});
module.exports = router;
