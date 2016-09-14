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
    let divStyle = {
      display: "inline-block",
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all' // 'ms' is the only lowercase vendor prefix
    };
    let titles = this.state.imgurData.map(function(item) {
      let subLink;
      if(item.cover) {
        subLink = "http://i.imgur.com/" + item.cover + "b.jpg";
      } else {
        let len = item.link.length;
        subLink = item.link.substr(0, len-4) + "b" + item.link.substr(len-4, len);
      }
      return (
        <div key={item.id} style={divStyle}>
          <img alt="" src={subLink} height="250px" width="250px" />
          
        </div>
      );
    });
    return (
      <div>
        {titles}
      </div>
    );
  }
});

ReactDOM.render(
  <UserGist/>,
  document.getElementById('app')
);