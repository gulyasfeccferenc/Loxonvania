/** Model to keep our User data in one place */
const mongoose = require('mongoose');
const Worker = require('./worker');

const unitSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  company: {
    type: String,
    require: true
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
  }

});

module.exports = mongoose.model('User', unitSchema);
