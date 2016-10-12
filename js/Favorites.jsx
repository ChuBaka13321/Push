const React = require('react');
const ImageThumb = require('./ImageThumb')
const Header = require('./Header');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');
const { Link, browserHistory } = require('react-router');
const { object } = React.PropTypes

// {this.props.favorites
//             .filter(function(image) {
//               if(localStorage[image.id]) {
//                 return image;
//               }
//             })
//             .map(function(image){
//               return(<ImageThumb {...image} key={image.id}/>)
//             })}
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
    let test;
    console.log(this.props.favorites, 'this.props.favorites yo')
    if(Object.keys(this.props.favorites).length > 0)  {
      test = [];
      for(let imageId in this.props.favorites) {
        console.log(this.props.favorites[imageId])
        test.push(<ImageThumb {...this.props.favorites[imageId]} key={imageId}/>);
      }
      favs = (
        <div>
          <h4>Awesome collection so far! Click on your images to view them better or check out the most <Link to={`/`}>recent images.</Link></h4>
          {test}
        </div>
      );
    } else {
      favs = (<h4>Your favorites section is empty! Feel free to check out and/or save the most <Link to={`/`}>recent images.</Link></h4>)
    }
    return (
      <div className="container">
        <Header/>
        <div className="images">
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

// Favorites.propTypes = {
//   favorites: object.isRequired
// }

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Favorites);
// module.exports = Favorites;
// module.exports = connector(Favorites);