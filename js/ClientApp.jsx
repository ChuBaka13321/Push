const React = require('react');
const ReactDOM = require('react-dom');
const Landing = require('./Landing');
const Details = require('./Details');
const Favorites = require('./Favorites')
const { Router, Route, hashHistory, IndexRoute } = require('react-router');
const { store } = require('./Store')
const { Provider } = require('react-redux')

// const routes = [{
//   path: '/',
//   component: Landing
// }, {
//   path: '/details/:id',
//   component: Details
// }]
// routes = {routes}

const App = React.createClass({
  render() {
    return(
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path = '/' component={Landing}/>
          <Route path='/details/:id' component={Details}/>
          <Route path='/favorites' component={Favorites}/>
        </Router> 
      </Provider>  
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))