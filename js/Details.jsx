const React = require('react');
const SaveFavorites = require('./SaveFavorites');
const Header = require('./Header');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const ImageActions = require('./ImageActions')
const UserActions = require('./UserActions')

const Details = React.createClass({
  getDefaultProps: function() {
    return {
      images: []
    };
  },

  componentDidMount: function(){
    this.props.setImages()
    if(this.props.uid) {
      this.props.checkFavorites(this.props.uid, this.props.params.id);
    }
  },

  assignImage(id) {
    const imageArray = this.props.images.filter((image) => image.id === id);
    return imageArray[0] || {title:'hi', link: 'stuff', description: 'k'};
  },

  render() {
    //add link to view image on imgur itself
    const { title, link, description } = this.assignImage(this.props.params.id);
    let favoritesButton;
    if(this.props.uid) {
      favoritesButton = (<SaveFavorites image = {this.assignImage(this.props.params.id)} inFavorites = {this.props.inFavorites}/>)
    } else {
      favoritesButton = (<h4>Sign Up or Sign In to save this to your favorites!</h4>);
    };
    return (
      <div className="container">
        <Header />
        <div className="content">
          <h2>{title}</h2>
          <img alt="" src={link} className="detailsImage" />
          <p>{description}</p>
          {favoritesButton}
        </div>
      </div>
    )
  }
})

const mapStateToProps = (state) => { 
  return { 
    images: state.images,
    uid: state.uid,
    inFavorites: state.inFavorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImages: () => {
      dispatch(ImageActions.getImages())
    },
    checkFavorites: function(userId, imageId) {
      dispatch(UserActions.checkFavorites(userId, imageId))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Details);
