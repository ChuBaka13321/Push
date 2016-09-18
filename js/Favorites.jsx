const React = require('react')
const ImageThumb = require('./ImageThumb')
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
    console.log(this.props)
    return (
      <div>
        <h1>Favorites</h1>
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
    );
  }
})

module.exports = connector(Favorites);