const React = require('react');
const ImageThumb = require('./ImageThumb')
const Header = require('./Header');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');
const { Link, browserHistory } = require('react-router');
const { object } = React.PropTypes

const Favorites = React.createClass({
  getDefaultProps: function() {
    return {
      favorites: {}
    };
  },
  componentDidMount: function(){
    if(this.props.uid) {
      this.props.showFavorites(this.props.uid)
    } else {
      // redirect
      browserHistory.push('/')
    }
  },
  render(){
    let favs;
    let images;
    if(Object.keys(this.props.favorites).length > 0)  {
      images = [];
      for(let imageId in this.props.favorites) {
        images.push(<ImageThumb {...this.props.favorites[imageId]} key={imageId}/>);
      }
      images.sort(function(a, b) {
        // sorting by newest according to datetime posted via imgur
        return b.props.datetime - a.props.datetime;
      })
      favs = (
        <div>
          <h4>Awesome collection so far! Click on your images to view them better or check out the most <Link to={`/`} className="landingLink">recent images.</Link></h4>
          {images}
        </div>
      );
    } else {
      favs = (<h4>Your favorites section is empty! Feel free to check out and/or save the most <Link to={`/`} className="landingLink">recent images.</Link></h4>)
    }
    return (
      <div className="container">
        <Header/>
        <div className="content">
          <h2>Your Favorites Collection</h2>
          <div>
            {favs}
          </div>
        </div>
      </div>
    );
  }
})

const mapStateToProps = (state) => { 
  return { 
    email: state.email,
    uid: state.uid,
    favorites: state.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showFavorites: function(userId) {
      dispatch(UserActions.getFavorites(userId))
    }
  }
}

Favorites.propTypes = {
  favorites: object.isRequired
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Favorites);
