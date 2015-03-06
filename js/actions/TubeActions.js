var AppDispatcher = require('../dispatcher/AppDispatcher');
var TubeConstants = require('../constants/TubeConstants');

var TubeActions = {
  refresh: function() {
    AppDispatcher.dispatch({
      actionType: TubeConstants.REFRESH_LINES
    })
  }
}

module.exports = TubeActions
