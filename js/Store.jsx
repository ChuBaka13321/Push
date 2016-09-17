const redux = require('redux')
const reactRedux = require('react-redux')
const $ = require('jquery')
const clientId = '3fe8ad5fb43ef74';

const GET_IMAGES = 'getImages'
const initialState = {
  images: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      getImages(action.dispatch)
    case 'setImages':
      return setImagesState(state, action.data)
    default:
      return state
  }
}

const getImages = (dispatch) => {
  const images = $.ajax({ 
      url: 'https://api.imgur.com/3/gallery/r/GetMotivated/time/all/0',
      headers: {
      'Authorization': `Client-ID ${clientId}`
    },
    type: 'GET',
    success: function(data) { 
      dispatch({type: 'setImages', data: data.data});
    }
  })
}

const setImagesState = (state, data) => {
    console.log(data, 'new state?')
    const newState = {};
    Object.assign(newState, state, {images: data})
    return newState;
  }

const store = redux.createStore(rootReducer, initialState, redux.compose(
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
))

const mapStateToProps = (state) => { 
  return { 
    images: state.images
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImages:() =>{
      dispatch({type: GET_IMAGES, dispatch: dispatch})
    }
  }
  
}

const connector = reactRedux.connect(mapStateToProps, mapDispatchToProps)
module.exports = { connector, store, rootReducer }


