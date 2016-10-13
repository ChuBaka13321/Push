const React = require('react');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');

const SaveFavorites = React.createClass({
  saveToFavorites(){
    let save = confirm("Are you sure you want to add this image to favorites?");
    // currently saving to firebase favorites
    if(save) {
      this.props.saveToFavorites(this.props.uid, this.props.image)
    }
  },

  removeFromFavorites(){
    let remove = confirm("Are you sure you want to remove this image from your favorites?");
    // currently saving to firebase favorites
    if(remove) {
      this.props.removeFromFavorites(this.props.uid, this.props.image);
    }
  },

  render() {
    let saveOrRemove;
    if(this.props.inFavorites) {
      saveOrRemove = (<button type="button" className="favoritesButton" onClick = {this.removeFromFavorites}>Remove from Favorites</button>)
    } else {
      saveOrRemove = (<button type="button" className="favoritesButton" onClick = {this.saveToFavorites}>Save to Favorites</button>)
    }
    return(
      <div>
        {saveOrRemove}
      </div>
    )
  }
})

const mapStateToProps = (state) => { 
  return { 
    email: state.email,
    uid: state.uid,
    favorites: state.favorites
  }
}

//dispatch actions
const mapDispatchToProps = (dispatch) => {
  return {
    saveToFavorites: (uid, image) => {
      dispatch(UserActions.saveToFavorites(uid, image));
    },
    removeFromFavorites: (uid, image) => {
      dispatch(UserActions.removeFromFavorites(uid, image));
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SaveFavorites);