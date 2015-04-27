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
    TubeStore.addLoadingListener(this._onLoading);
    TubeStore.addChangeListener(this._onChange);
  },

  render: function() {
    var lines = this.state.lines.map(function(line) {
      var status = function() {
        return line.status == 'good service' ? 'status good-service' : 'status'
      }

      var messages = function(messages) {
        if (messages.length > 0) {
          return (
            <div className="messages">
              {messages}
            </div>
          )
        }
      }

      return (
        <li key={line.id} className={line.id}>
          <header>
            {line.name}
            <span className={status()}>{line.status}</span>
          </header>
          {messages(line.messages)}
        </li>
      )
    })

    var refresh = this.state.loading ? 'refresh loading' : 'refresh';

    return (
      <div>
        <header className="main">
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
