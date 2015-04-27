var React = require('react');

var TubeApp = require('./components/TubeApp.react');
var TubeActions = require('./actions/TubeActions');

React.render(
  <TubeApp />,
  document.getElementById('tubeapp')
);

TubeActions.refresh();
