const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./Landing');
const { Router, Route, hashHistory } = require('react-router');

const App = React.createClass({
  render() {
    return(
      <div>
        <h1>Some Motivational Images To Help You Get Through</h1>
        <Landing/>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))