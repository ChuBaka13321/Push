const React = require('react');
const ImageThumb = require('./ImageThumb');
const Header = require('./Header');
// const { connector } = require('./Store');
const C = require('./Constants');
const ReactRedux = require('react-redux')
const ImageActions = require('./ImageActions')

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

const mapStateToProps = (state) => { 
  return { 
    images: state.images,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImages: () => {
      dispatch(ImageActions.getImages())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Landing);
// module.exports = connector(Landing);
