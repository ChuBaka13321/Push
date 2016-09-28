const React = require('react')
const ImageThumb = require('./ImageThumb')
const Header = require('./Header');
const { connector } = require('./Store');

const Favorites = React.createClass({
  getDefaultProps: function() {
    return {
      images: []
    };
  },
  componentDidMount: function(){
    this.props.setImages()
  },
  render(){
    return (
      <div className="container">
        <Header/>
        <div className="images">
          <h2>Favorites</h2>
          <div>
            {this.props.images
            .filter(function(image) {
              if(localStorage[image.id]) {
                return image;
              }
            })
            .map(function(image){
              return(<ImageThumb {...image} key={image.id}/>)
            })}
          </div>
        </div>
      </div>
    );
  }
})

module.exports = connector(Favorites);