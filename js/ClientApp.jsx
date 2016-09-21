const React = require('react');
const Landing = require('./Landing');
const Details = require('./Details');
const Favorites = require('./Favorites')
const { Router, Route, browserHistory } = require('react-router');
const { store } = require('./Store')
const { Provider } = require('react-redux')

//externalize routes for routing on server
// const routes = () => ({
//   <Route path = '/' component={Landing}/>
//   <Route path='/details/:id' component={Details}/>
//   <Route path='/favorites' component={Favorites}/>
// })

const routes = function() {
  return [{
    path: '/',
    component: Landing
  }, {
    path: '/details/:id',
    component: Details
  }, {
    path: '/favorites',
    component: Favorites
  }]
};

const App = React.createClass({
  render() {
    return(
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes()}
        </Router> 
      </Provider>  
    )
  }
})

App.Routes = routes

module.exports = App