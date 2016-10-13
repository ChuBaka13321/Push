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
      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(function(user) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log(user, ' is signed in')
            dispatch({type: C.SIGN_IN, email: user.email, uid: user.uid})

            // creating the database to prepare for storing of favorites
            firebase.database().ref('users/' + user.uid).set({
              email: user.email
            });
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

  signInUser: function(email, pass) {
    console.log('yooo')
    return function(dispatch, getState) {
      firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(function(user) {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            console.log(user.uid, ' is signed in')
            dispatch({type: C.SIGN_IN, email: email, uid: user.uid})
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
    let userAction = this;
    return function(dispatch, getState) {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          dispatch({type: C.SIGN_IN, email: user.email, uid: user.uid})
          userAction.getFavorites(user.uid);
        } else {
          // No user is signed in.
          console.log('noone is signed in')
        }
      });
    }
  },

  signOut: function() {
    return function(dispatch, getState) {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({type: C.SIGN_OUT, email: '', uid: '', favorites: {}})
      }, function(error) {
        // An error happened.
      });
    }
  },

  saveToFavorites: function(uid, image) {
    return function(dispatch, getState) {
      // maybe some logic to check whether the image is already in the favorites

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/users/' + uid + '/favorites/' + image.id] = image;

      firebase.database().ref().update(updates);

      // send a dispatch to notify the frontend that the image has been stored
    }
  },

  removeFromFavorites: function(uid, image) {
    return function(dispatch, getState) {
      var updates = {};
      updates['/users/' + uid + '/favorites/' + image.id] = null;

      firebase.database().ref().update(updates);
    }
  },

  getFavorites: function(userId) {
    return function(dispatch, getState) {
      firebase.database().ref('/users/' + userId + '/favorites/').once('value').then(function(snapshot) {
        // empty object if user does not have favorites yet
        let favorites = snapshot.val() || {};
        dispatch({type: C.FAVORITES, favorites: favorites})
        // ...
      });
    }
  },

  checkFavorites: function(userId, imageId) {
    return function(dispatch, getState) {
      firebase.database().ref('/users/' + userId + '/favorites/').once('value').then(function(snapshot) {
        let favorites = snapshot.val() || {};
        if(favorites[imageId]) {
          dispatch({type: C.IN_FAVORITES, inFavorites: true})
        } else {
          dispatch({type: C.IN_FAVORITES, inFavorites: false})
        }
      })
    }
  }
}

