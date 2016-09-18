const React = require('react');
const SaveFavorites = require('./SaveFavorites')
const { Link } = require('react-router')
const { connector } = require('./Store');

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
    return imageArray[0] || {title:'hi', link: 'stuff', description: 'k'};
  },
  render() {
    console.log('hi');
    const { title, link, description } = this.assignImage(this.props.params.id);
    return (
      <div style={{textAlign: 'left'}}>
        <h1>{title}</h1>
        <img alt="" src={link} height="350px" width="350px" />
        <p>{description}</p>
        <SaveFavorites imageID = {this.props.params.id}/>
        <Link to={`/favorites`}>
          <h2>Favorites Page</h2>
        </Link>
      </div>
    )
  }
})

module.exports = connector(Details)