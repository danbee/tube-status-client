var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TubeConstants = require('../constants/TubeConstants');
var assign = require('object-assign');

var qwest = require('qwest');

var CHANGE_EVENT = 'change';
var LOADING_EVENT = 'loading';

var _lines = [];

var refreshLines = function(callback) {
  qwest.get('http://tube-status-server.herokuapp.com/now.json', {}, { timeout: 30000 }).then(function(data) {
    _lines = data;
    callback();
  })
}

var TubeStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _lines;
  },

  emitLoading: function() {
    this.emit(LOADING_EVENT);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addLoadingListener: function(callback) {
    this.on(LOADING_EVENT, callback);
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
      TubeStore.emitLoading();
      refreshLines(function() {
        TubeStore.emitChange();
      });
      break;

    default:
      // no op
  }
});

module.exports = TubeStore;
