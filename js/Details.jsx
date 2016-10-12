const React = require('react');
const SaveFavorites = require('./SaveFavorites');
const Header = require('./Header');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const ImageActions = require('./ImageActions')


  // <SaveFavorites imageID = {this.props.params.id}/>
const Details = React.createClass({
  getDefaultProps: function() {
    return {
      images: []
    };
  },

  // saveToFavorites: function() {
  //   console.log(this.props.uid)
  //   // this.props.saveToFavorites();
  // },

  componentDidMount: function(){
    this.props.setImages()
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
      favoritesButton = (<SaveFavorites image = {this.assignImage(this.props.params.id)} />)
      // favoritesButton = (<SaveFavorites imageId = {this.props.params.id} />)
      // favoritesButton = (<button type="button" onClick = {this.saveToFavorites}>Save to Favorites</button>);
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
    uid: state.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImages: () => {
      dispatch(ImageActions.getImages())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Details);
// module.exports = Details;
// module.exports = connector(Details)