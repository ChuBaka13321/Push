require('babel-register')

const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const ReactRouter = require('react-router')
const match = ReactRouter.match
const RouterContext = ReactRouter.RouterContext
const ReactRedux = require('react-redux')
const Provider = ReactRedux.Provider
const Store = require('./js/Store.jsx')
const store = Store.store
const _ = require('lodash')
const fs = require('fs')
const port = 1337
const baseTemplate = fs.readFileSync('./index.html')
const template = _.template(baseTemplate)
const ClientApp = require('./js/ClientApp.jsx')
const Routes = ClientApp.Routes
const bodyParser = require('body-parser')
const app = express()

const firebase = require("firebase");
//firebase stuff
const config = {
  apiKey: "AIzaSyCb-MSv8bEfuZu7EWsY_eA3ben5zFooRCg",
  authDomain: "push-f3c35.firebaseapp.com",
  databaseURL: "https://push-f3c35.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "397338317643"
};
firebase.initializeApp(config);

app.use('/public', express.static('./public'))

// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res) => {
  console.log(req.body)
  match({ routes: Routes(), location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      //send body if everything works out
      const body = ReactDOMServer.renderToString(
        React.createElement(Provider, {store},
          React.createElement(RouterContext, renderProps)
        )
      )
      res.status(200).send(template({ body }))
    } else {
      res.status(404).send('Not found')
    }
  })
})




console.log('listening on port ' + port)
app.listen(port)



