var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TubeConstants = require('../constants/TubeConstants');
var assign = require('object-assign');

var qwest = require('qwest');

var CHANGE_EVENT = 'change';

var _lines = [];

var refreshLines = function(callback) {
  qwest.get('http://tube-status-server.herokuapp.com/now.json').then(function(data) {
    _lines = data;
    console.log(_lines);
    callback();
  })
}

var TubeStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _lines;
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

AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case TubeConstants.REFRESH_LINES:
      refreshLines(function() {
        TubeStore.emitChange();
      });
      break;

    default:
      // no op
  }
});

module.exports = TubeStore;
