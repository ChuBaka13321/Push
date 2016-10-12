const React = require('react');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');

const SaveFavorites = React.createClass({
  saveToFavorites(){
    var save = confirm("Are you sure you want to add this image to favorites?");
    // currently saving to firebase favorites
    if(save) {
      this.props.saveToFavorites(this.props.email, this.props.uid, this.props.image)
    }
  },
  render() {
    return(
      <button type="button" onClick = {this.saveToFavorites}>Save to Favorites</button>
    )
  }
})

const mapStateToProps = (state) => { 
  return { 
    email: state.email,
    uid: state.uid
  }
}

//dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    saveToFavorites: (email, uid, image) => {
      dispatch(UserActions.saveToFavorites(email, uid, image))
      // dispatch({type: C.IS_LOGGED_IN});
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SaveFavorites);
// module.exports = SaveFavorites;