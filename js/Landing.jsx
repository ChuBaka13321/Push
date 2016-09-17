const React = require('react');
const ReactDOM = require('react-dom');
const ImageThumb = require('./ImageThumb');
const $ = require('jquery')
const clientId = '3fe8ad5fb43ef74';
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

  // componentWillMount: function() {
  //   this.serverRequest = $.ajax({ 
  //       url: 'https://api.imgur.com/3/gallery/r/GetMotivated/time/all/0',
  //       headers: {
  //       'Authorization': `Client-ID ${clientId}`
  //     },
  //     type: 'GET',
  //     success: function(data) { 
  //       this.setState({
  //         imgurData: data.data
  //       })
  //     }.bind(this)
  //   })
  // },

  // componentWillUnmount: function() {
  //   this.serverRequest.abort();
  // },

  render: function() {
    console.log(this.props, 'heyoy')
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