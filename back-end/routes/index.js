var express = require('express');
var router = express.Router();

var manhole_controller = require('../controllers/manholeController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/manholes', manhole_controller.manhole_list);
router.get('/manhole/:id', manhole_controller.manhole_detail);

module.exports = router;
