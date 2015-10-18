'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PollSchema = new Schema({
  ownerId: Number,
  name: String,
  title: String,
  options: [String],
  votes: [Number],
  active: Boolean
});

module.exports = mongoose.model('Poll', PollSchema);
