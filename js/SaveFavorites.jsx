const React = require('react');

const SaveFavorites = React.createClass({
  saveToFavorites(){
    console.log(this.props)
  },
  render() {
    return(
      <button type="button" onClick = {this.saveToFavorites}>Click it.</button>
    )
  }
})

module.exports = SaveFavorites;