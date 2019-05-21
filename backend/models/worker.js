/* Keeping units model here*/
const mongoose = require('mongoose');

const unitSchema = mongoose.Schema({
  id: String,
  name: {
    type: String,
    require: true
  },
  sprite: String,
  description: String,
  joined: Date,
  active: {
    type: Boolean,
    default: true
  },
  level: {
    type: Number,
    default: 0
  },
  type: Number,
  produce: Number
});

module.exports = mongoose.model('Unit', unitSchema);
