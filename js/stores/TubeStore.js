var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TubeConstants = require('../constants/TubeConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var TubeStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});
