const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery')
const clientId = '3fe8ad5fb43ef74';

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      imgurData: []
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.ajax({ 
        url: 'https://api.imgur.com/3/gallery/r/GetMotivated',
        headers: {
        'Authorization': `Client-ID ${clientId}`
      },
      type: 'GET',
      success: function(data) { 
        this.setState({
          imgurData: data.data
        })
        console.log(this.state.imgurData)
      }.bind(this)
    })
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    let titles = this.state.imgurData.map(function(item) {
      return (
        <li key={item.id}>
          <a href={item.link}>{item.link}</a>
        </li>
      );
    });
    return (
      <div>
        <ul>
          {titles}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist source="https://api.github.com/users/octocat/gists" />,
  document.getElementById('app')
);