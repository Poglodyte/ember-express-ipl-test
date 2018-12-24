var Manhole = require('../models/manhole');

// Get all Manholes
exports.manhole_list = function(req, res, next) {
  res.send('NOT IMPLEMENTED: Manhole list');
};

// Get specific Manhole by id
exports.manhole_detail = function(req, res, next) {
  res.send('NOT IMPLEMENTED: Manhole detail: ' + req.params.id);
};

// Add new Manhole
exports.manhole_create = function(req, res, next) {
  res.send('NOT_IMPLEMENTED: Manhole create');
};

// Testing Geospatial Query
exports.manhole_query_within = function(req, res, next) {
  res.send('NOT IMPLEMENTED: Manhole query within');
};