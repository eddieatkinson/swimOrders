var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('You hit "/"');
  res.render('index', { title: 'Express' });
});

router.post('/getpools', (req, res, next) => {
  console.log('Getting pools...');
  console.log(req.body);
  res.json({
    msg: 'stuff is getting returned',
  });
});

module.exports = router;
