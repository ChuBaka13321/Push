const redux = require('redux');
const reactRedux = require('react-redux');
const { setImages, getImages } = require('./ImageActions');
const C = require('./Constants');
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

// const GET_IMAGES = 'getImages'
// const SET_IMAGES = 'setImages'
const IS_LOGGED_IN = 'isLoggedIn'


const initialState = {
  images: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.GET_IMAGES:
      getImages(action.dispatch, store.getState().length)
    case C.SET_IMAGES:
      return setImagesState(state, action.data)
    case IS_LOGGED_IN:
      return setUserState(state)
    default:
      return state
  }
}

const store = redux.createStore(
  rootReducer, 
  initialState
  // ,redux.compose(
  //   typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  // )
)

const setUserState = (state) => {
  const blah = {};
  var user = firebase.auth().currentUser;

  if (user) {
    // User is signed in.
    console.log(user.email, ' is signed in')
  } else {
    console.log('no user was signed in, signing zzzzzz in')
    const email = 'zzzzzz@zzzzzz.com'
    const pass = 'zzzzzz'
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  
  Object.assign(blah, state, {testing: 'testing'})
  return blah;
}

const setImagesState = (state, data) => {
  // creating newState as to not 'mutate' current state
  const newState = {};
  // adding the imgur data under images key
  Object.assign(newState, state, {images: data})
  return newState;
}

// called anytime store state is updated
const mapStateToProps = (state) => { 
  return { 
    images: state.images,
    testing: state.testing
  }
}

//dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    // setImages:() =>{
    //   dispatch({type: GET_IMAGES, dispatch: dispatch})
    // },
    setImages: () => {
      dispatch(setImages(dispatch));
    },
    isLoggedIn: () => {
      dispatch({type: IS_LOGGED_IN});
    }
  }
}

// reactRedux connects React component to a Redux store, exports as "connector" constant
const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)
module.exports = { connector, store, rootReducer }


