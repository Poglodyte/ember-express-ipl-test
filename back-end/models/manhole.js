var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ManholeSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
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

module.exports = mongoose.model('Manhole', ManholeSchema);