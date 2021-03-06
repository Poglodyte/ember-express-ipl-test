var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ManholeSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    // Can make separate PointSchema and drop in
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
  }
);

ManholeSchema
.virtual('url')
.get(function () {
  return '/manhole/' + this._id;
});

ManholeSchema
.virtual('longitude')
.get(function () {
  return this.location.coordinates[0];
});

ManholeSchema
.virtual('latitude')
.get(function () {
  return this.location.coordinates[1];
});

module.exports = mongoose.model('Manhole', ManholeSchema);