const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*
export interface Achievment {
  id: number;
  name: string;
  desc: string;
  level: number;
  visible: boolean;
  owned: boolean;
  options: string;
}
* */

const unitSchema = mongoose.Schema({
  id: {
    type: Number,
    require: false
  },
  name: {
    type: String,
    require: true,
    unique: true
  },
  desc: {
    type: String,
    require: true
  },
  level: {
    type: Number,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  visible: {
    type: Boolean,
    require: true
  },
  owned: {
    type: Boolean,
    require: false
  },
  options: {
    type: String,
    require: true
  },
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: false
  }]
});

//unitSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Achievment', unitSchema);
