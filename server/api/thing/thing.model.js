'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  icon: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);
