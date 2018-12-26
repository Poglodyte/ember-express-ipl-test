var express = require('express');
var router = express.Router();

var manhole_controller = require('../controllers/manholeController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Manhole Identifier' });
});

router.get('/manholes', manhole_controller.manhole_list);
router.get('/manholes/:id', manhole_controller.manhole_detail);

router.get('/manhole/create', manhole_controller.manhole_create_get);
router.post('/manhole/create', manhole_controller.manhole_create_post);

router.get('/manholes/query_form', manhole_controller.query_form_get);
router.get('/manholes/query', manhole_controller.manhole_query_within);

module.exports = router;
