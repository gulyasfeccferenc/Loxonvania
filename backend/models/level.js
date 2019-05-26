const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const unitSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
    unique: true
  },
  rank: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true,
    unique: true
  },
  achievments: [{ // https://stackoverflow.com/questions/26008555/foreign-key-mongoose
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievment',
    require: true
  }]
});

unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Level', unitSchema);
