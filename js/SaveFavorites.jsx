const React = require('react');

const SaveFavorites = React.createClass({
  saveToFavorites(){
    console.log(this.props.imageID)
    var save = confirm("Are you sure you want to add this image to favorites?");
    //set to localStorage to be accessed via Favorites page;
    if (save) {
      localStorage.setItem(this.props.imageID, this.props.imageID);
    }
    
    console.log(localStorage)
  },
  render() {
    console.log(localStorage)
    return(
      <button type="button" onClick = {this.saveToFavorites}>Save to Favorites</button>
    )
  }
})

module.exports = SaveFavorites;