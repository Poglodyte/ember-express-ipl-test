var Manhole = require('../models/manhole');

// Get all Manholes
exports.manhole_list = function(req, res, next) {

  // Trying to handle all requests for multiple manholes here

  // Maybe there is another way to trigger a GET on backend
  // /manholes/query, but this was the best way I could find to
  // still go through Ember's store

  // Oh, yes I think you can just use jQuery.getJSON('/manholes/query...)

  if(req.query.nearLng) {

    Manhole.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [ req.query.nearLng , req.query.nearLat ]
          },
          $minDistance: req.query.minDistance,
          $maxDistance: req.query.maxDistance
        }
      }
    }).exec(function (err, manhole_results) {
      if (err) { return next(err); }
      res.send({ manhole: manhole_results });
    });

  }
  else {

    Manhole.find().exec(function (err, manholes) {
      if (err) { return next(err); }
    //  res.render('manhole_list', { manhole_list: manholes });
      // Now sending to Ember client instead
      res.send({manhole: manholes});
    });
    
  }

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
  //  res.render('manhole_detail', { manhole: manhole });
    // Now sending to Ember client instead
    res.send({manhole: manhole});
  });

};

// Add new Manhole - get form
exports.manhole_create_get = function(req, res, next) {
  res.render('manhole_form');
};

// Add new Manhole - save to db
exports.manhole_create_post = function(req, res, next) {
  
  // TODO: Add validation and santization using express-validator

  // Does Ember createRecord generate an id for us?
  // console.log(req.body.manhole._id);   // both id and _id are undefined so I guess not...

  // Still need to create a new object with mongoose to generate the id
  var manhole = new Manhole({
    name: req.body.manhole.name,
    location: req.body.manhole.location
  });

  manhole.save(function (err) {
    if (err) { return next(err); }
  //  res.redirect(manhole.url);
  //  Should send a response? Send id back? Entire record object?
    res.send({manhole: manhole}); // that seems to work nicely
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