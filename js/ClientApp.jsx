const React = require('react');
const ReactDOM = require('react-dom');
const UserGist = require('./UserGist');
const { Router, Route, hashHistory } = require('react-router');

const App = React.createClass({
  render() {
    return(
      <UserGist/>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))