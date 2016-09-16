const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./Landing');
const Details = require('./Details')
const { Router, Route, hashHistory } = require('react-router');

const App = React.createClass({
  // assignImage (nextState, replace) {
  //   const imageArray = images.filter((image) => image.id === nextState.params.id)

  //   if (imageArray.length < 1) {
  //     return replace('/');
  //   }

  //   Object.assign(nextState.params, imageArray[0])
  //   return nextState;
  // },
  render() {
    return(
      <Router history={hashHistory}>        
        <Route path='/' component={Landing} />
        <Route path='/details/:id' component={Details} />
      </Router>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))