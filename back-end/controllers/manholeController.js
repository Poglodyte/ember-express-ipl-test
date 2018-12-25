var Manhole = require('../models/manhole');

// Get all Manholes
exports.manhole_list = function(req, res, next) {
  
  Manhole.find().exec(function (err, manholes) {
    if (err) { return next(err); }
    res.render('manhole_list', { manhole_list: manholes });
  });

};

// Get specific Manhole by id
exports.manhole_detail = function(req, res, next) {
  
  Manhole.findById(req.params.id)
  .exec(function (err, manhole) {
    if (err) { return next(err); }
    if (manhole==null) {
      var err = new Error('Manhole not found');
      err.status = 404;
      return next(err);
    }
    res.render('manhole_detail', { manhole: manhole });
  });

};

// Add new Manhole - get form
exports.manhole_create_get = function(req, res, next) {
  res.render('manhole_form');
};

// Add new Manhole - save to db
exports.manhole_create_post = function(req, res, next) {
  
  // TODO: Add validation and santization using express-validator

  var manhole = new Manhole({
    name: req.body.name,
    location: { type: "Point", coordinates: [ req.body.lng, req.body.lat ] }
  });

  manhole.save(function (err) {
    if (err) { return next(err); }
    res.redirect(manhole.url);
  });

};

// Get manhole query form
exports.query_form_get = function(req, res, next) {
  res.render('query_form');
};

// Testing Geospatial Query
exports.manhole_query_within = function(req, res, next) {

  Manhole.find({
    location: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [ req.query.lng , req.query.lat ]
        },
        $minDistance: req.query.minDistance,
        $maxDistance: req.query.maxDistance
      }
    }
  }).exec(function (err, manhole_results) {
    if (err) { return next(err); }
    res.render('manhole_query', { manhole_list: manhole_results });
  });

};