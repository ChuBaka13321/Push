const React = require('react');
const ReactDOM = require('react-dom');
const ImageThumb = require('./ImageThumb');
const $ = require('jquery')
const clientId = '3fe8ad5fb43ef74';

const Landing = React.createClass({
  getInitialState: function() {
    return {
      imgurData: []
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.ajax({ 
        url: 'https://api.imgur.com/3/gallery/r/GetMotivated/time/all/0',
        headers: {
        'Authorization': `Client-ID ${clientId}`
      },
      type: 'GET',
      success: function(data) { 
        this.setState({
          imgurData: data.data
        })
      }.bind(this)
    })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        <h1>Some Motivational Images To Help You Get Through</h1>
        <div>
          {this.state.imgurData.map(function(image){
            return(<ImageThumb {...image} key={image.id}/>)
          })}
        </div>
      </div>
    );
  }
});

module.exports = Landing