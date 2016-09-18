const React = require('react');
const ReactDOM = require('react-dom');
const ImageThumb = require('./ImageThumb');
const { connector } = require('./Store');

const Landing = React.createClass({
  getDefaultProps: function() {
    return {
      images: []
    };
  },
  componentDidMount: function(){
    this.props.setImages()
  },

  render: function() {
    return (
      <div>
        <h1>Some Motivational Images To Help You Get Through</h1>
        <div>
          {this.props.images.map(function(image){
            return(<ImageThumb {...image} key={image.id}/>)
          })}
        </div>
      </div>
    );
  }
});

module.exports = connector(Landing)