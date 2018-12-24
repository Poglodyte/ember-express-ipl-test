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

  Manhole.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [ -70, 40 ]
        },
        $maxDistance: 5000
      }
    }
  }).exec(function (err, manhole_results) {
    if (err) { return next(err); }
    res.render('manhole_query', { manhole_list: manhole_results });
  });

};