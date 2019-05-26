/** Model to keep our User data in one place */
const mongoose = require('mongoose');
const Worker = require('./worker');
const uniqueValidator = require('mongoose-unique-validator');

const unitSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  company: {
    type: String,
    require: true,
    unique: true
  },
  point: {
    type: Number,
    default: 0
  },
  // Auth
  avatar: {
    type: String,
    default: null},
  level: {
    type: Number,
    default: 0
  },
  xp: {
    type: Number,
    default: 0
  }

});

unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', unitSchema);
