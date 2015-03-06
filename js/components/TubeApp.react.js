var React = require('react');
var TubeStore = require('../stores/TubeStore');
var TubeActions = require('../actions/TubeActions');

var TubeApp = React.createClass({
  getInitialState: function() {
    return {
      lines: TubeStore.getAll()
    }
  },

  componentDidMount: function() {
    TubeStore.addChangeListener(this._onChange);
  },

  render: function() {
    var lines = this.state.lines.map(function(line) {
      return <li className={line.name}>{line.name}</li>
    })

    return (
      <div>
        <header>
          <button onClick={this.refresh}>Refresh</button>
        </header>
        <ul>
          {lines}
        </ul>
      </div>
    )
  },

  refresh: function() {
    TubeActions.refresh();
  },

  _onChange: function() {
    this.setState({
      lines: TubeStore.getAll()
    });
  }
})

module.exports = TubeApp;
