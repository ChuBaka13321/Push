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
  },

  assignImage(id) {
    const imageArray = this.props.images.filter((image) => image.id === id);
    // let isVideo = (imageArray[0].title.split(' ')[0] === '[Video]');
    // if(isVideo) {
    //   imageArray[0].link = "http://i.imgur.com/" + imageArray[0].cover + ".mp4"
    // }
    return imageArray[0] || {title:'hi', link: 'stuff', description: 'k'};
  },

  render() {
    //add link to view image on imgur itself
    const { title, link, description, cover} = this.assignImage(this.props.params.id);
    let imageOrVideo;
    let inFavoritesProp;
    let favoritesButton;
    if(title.split(' ')[0] === '[Video]') {
      let videoLink = "http://i.imgur.com/" + cover + ".mp4"
      imageOrVideo = (
        <video className="detailsImage" autoPlay controls>
          <source src={videoLink} type="video/mp4"/>
        </video>
      )
    } else {
      imageOrVideo = (<img alt="" src={link} className="detailsImage" />);
    }

    if(this.props.favorites[this.props.params.id]) {
      inFavoritesProp = true;
    } else {
      inFavoritesProp = false;
    }

    if(this.props.uid) {
      favoritesButton = (<SaveFavorites image = {this.assignImage(this.props.params.id)} inFavorites = {inFavoritesProp}/>)
    } else {
      favoritesButton = (<h4>Sign Up or Sign In to save this to your favorites!</h4>);
    };
    return (
      <div className="container">
        <Header />
        <div className="content">
          <h2>{title}</h2>
          {imageOrVideo}
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
    favorites: state.favorites
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
