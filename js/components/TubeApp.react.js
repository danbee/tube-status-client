var React = require('react');
var TubeStore = require('../stores/TubeStore');
var TubeActions = require('../actions/TubeActions');

var TubeApp = React.createClass({
  getInitialState: function() {
    return {
      lines: TubeStore.getAll(),
      loading: false
    }
  },

  componentDidMount: function() {
    TubeStore.addChangeListener(this._onChange);
    TubeStore.addLoadingListener(this._onLoading);
  },

  render: function() {
    var lines = this.state.lines.map(function(line) {
      var status = function() {
        return line.status == 'good service' ? 'status good-service' : 'status'
      }

      return (
        <li key={line.id} className={line.id}>
          {line.name}
          <span className={status()}>{line.status}</span>
        </li>
      )
    })

    var refresh = this.state.loading ? 'refresh loading' : 'refresh';

    return (
      <div>
        <header>
          <a href="" onClick={this.refresh} className={refresh}><img src="/img/refresh.svg" alt="refresh" /></a>
        </header>
        <ul className="lines">
          {lines}
        </ul>
      </div>
    )
  },

  refresh: function(ev) {
    ev.preventDefault();
    TubeActions.refresh();
  },

  _onLoading: function() {
    this.setState({
      loading: true
    });
  },

  _onChange: function() {
    this.setState({
      lines: TubeStore.getAll(),
      loading: false
    });
  }
})

module.exports = TubeApp;
