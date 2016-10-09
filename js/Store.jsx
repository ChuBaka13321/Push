const redux = require('redux');
const reactRedux = require('react-redux');
const { setImages, getImages } = require('./ImageActions');
const C = require('./Constants');
const thunk = require('redux-thunk').default


const initialState = {
  images: [],
  uid: ''
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case C.SET_IMAGES:
      return setImagesState(state, action.data)
    case C.SIGN_IN:
      return signInUser(state, action.uid)
    default:
      return state
  }
}


const store = redux.createStore(
  rootReducer, 
  initialState,
  redux.applyMiddleware(thunk)
  // ,redux.compose(
  //   typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
  // )
)

// set the images to the state
const setImagesState = (state, data) => {
  // creating newState as to not 'mutate' current state
  const newState = {};
  // adding the imgur data under images key
  Object.assign(newState, state, {images: data})
  return newState;
}


const signInUser = (state, uid) => {
  const newState = {};
  Object.assign(newState, state, {uid: uid})
  console.log(newState, 'newState after user signed in')
  return newState;
}
// called anytime store state is updated, maps to components' props
const mapStateToProps = (state) => { 
  return { 
    images: state.images,
    uid: state.uid
  }
}

//dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => {
      dispatch({type: C.IS_LOGGED_IN});
    }
  }
}

// reactRedux connects React component to a Redux store, exports as "connector" constant
// const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)
// const connector;
module.exports = { store, rootReducer }
// module.exports = { connector, store, rootReducer }


