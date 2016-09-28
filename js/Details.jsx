const React = require('react');
const SaveFavorites = require('./SaveFavorites');
const Header = require('./Header');
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
    const { title, link, description } = this.assignImage(this.props.params.id);
    return (
      <div className="container">
        <Header />
        <div className="content">
          <h2>{title}</h2>
          <img alt="" src={link} className="detailsImage" />
          <p>{description}</p>
          <SaveFavorites imageID = {this.props.params.id}/>
        </div>
      </div>
    )
  }
})

module.exports = connector(Details)