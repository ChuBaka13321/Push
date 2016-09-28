const React = require('react');
const ImageThumb = require('./ImageThumb');
const Header = require('./Header');
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
      <div className="container">
        <Header />
        <div className = "content">
          <h2>Some Motivational Images To Help You Get Through</h2>
          <div>
            {this.props.images.map(function(image){
              return(<ImageThumb {...image} key={image.id}/>)
            })}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = connector(Landing)