const C = require('./Constants')
const axios = require('axios');
const clientId = '3fe8ad5fb43ef74';

module.exports = {
  getImages: function() {
    return function(dispatch, getState) {
      axios({
        url: 'https://api.imgur.com/3/gallery/r/GetMotivated/time/all/0',
        headers: {
          'Authorization': `Client-ID ${clientId}`
        },
        type: 'GET'
      })
      .then(function (response) {
        dispatch({type: C.SET_IMAGES, data: response.data.data});
      })
    }
  }
}