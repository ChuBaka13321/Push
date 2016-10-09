const C = require('./Constants')
//firebase stuff
const firebase = require("firebase");
const config = {
  apiKey: "AIzaSyCb-MSv8bEfuZu7EWsY_eA3ben5zFooRCg",
  authDomain: "push-f3c35.firebaseapp.com",
  databaseURL: "https://push-f3c35.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "397338317643"
};
firebase.initializeApp(config);

module.exports = {
  signUp: function(email, pass) {
    return function(dispatch, getState) {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('signed user out')
      }, function(error) {
        // An error happened.
      });
      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(function(user) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log(user.uid, ' is signed in')
            dispatch({type: C.SIGN_IN, uid: user.uid})
          } else {
            // No user is signed in.
            console.log('user did not signin')
          }
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }
  },

  checkUser: function() {
    return function(dispatch, getState) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          dispatch({type: C.SIGN_IN, uid: user.uid})
        } else {
          // No user is signed in.
          console.log('noone is signed in')
        }
      });
    }
  }
}