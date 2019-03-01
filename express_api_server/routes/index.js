var express = require('express');
var router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
  console.log("get call")
  res.render('index', { title: 'Express' });
});

// Here is what I changed~
router.post('/', function(req, res, next) {
  console.log("post call")
  if(!req.session.user_id){
  req.session.user_id = 1234 
  console.log('new user:',  req.session.user_id )}
  else
    console.log('id is',  req.session.user_id )

  console.log(req.body) // post data test
  console.log(req.session) // cookie test for server(really update cookie?)
  console.log(req.cookies) // cookie test for client(really saved the cookie?)

  req.session.save(()=>res.send())
  
});
// ~Here is what I changed

module.exports = router;
