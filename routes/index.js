var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '嘻哈汇街舞论坛' });
});

module.exports = router;
