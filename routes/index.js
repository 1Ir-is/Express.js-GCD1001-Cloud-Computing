var express = require('express');
var router = express.Router();
var authen = require('../modes/authenticator')
var display_product = require('../modes/table_display')
var gen_box = require('../modes/select_box')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN SHOP' });
});
// Process for Post request here
router.post('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP', message: "Please input username and password" });
});

router.post('/select_box', async function(req, res, next) {
  let shop_id = req.body.shops;
  let table = await display_product(shop_id);
  let box_string = await gen_box();
  res.render('admin', {title: 'welcome to admin', name: "Director", select_box: box_string, table_string: table});

});

// Process for login POST request
router.post('/login', async function(req, res, next) {
  let username =req.body.username;
  let password =req.body.password;
  console.log(username + ":" + password)
  let [authenticated, shop_id, role] = await authen(username, password)
  if(authenticated == true & role == 'shop'){
    let table = await display_product(shop_id);
    res.render('users', {title: 'welcome to user', name: username, table_string: table})
  }
  else if(authenticated == true & role == 'director'){
      let table = await display_product(shop_id);
      let box_string = await gen_box();
      res.render('admin', {title: 'welcome to admin', name: username, select_box: box_string, table_string: table})
  }
  else{
    res.render('login', { title: 'ATN SHOP', message: 'wrong user password' });
  }

});


module.exports = router;


