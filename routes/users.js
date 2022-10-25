var express = require('express');
var router = express.Router();
var display_product = require('../models/table_display');
var crud = require('../models/crud');
var session;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  session = req.session;
  if(session.user_id){
    let username = session.user_id;
    let shop_id = session.shop_id;
    let table = await display_product(shop_id);
    res.render('users', { title: 'welcome to user', 
                          name: username, 
                          table_string: table})
  }
  else{
    res.render('login', { title: 'ATN SHOP', 
                          message: 'please login' });
  }
});

router.post('/crud', async function(req, res, next) {
  session = req.session;
  console.log(req.body);
  let results = await crud(req.body);
  //refresh the page
  let table = await display_product(req.body.shop_id);
  res.render('users', { title: 'welcome to ATN', 
                        name: session.user_id, 
                        table_string: table})
});

module.exports = router;
