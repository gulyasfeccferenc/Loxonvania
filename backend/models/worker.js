/* Keeping units model here*/
const mongoose = require('mongoose');

const unitSchema = mongoose.Schema({
  // id: String, // TODO
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
  produce: Number,
  xp: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  }
});

module.exports = mongoose.model('Unit', unitSchema);
