const React = require('react')

const ImageThumb = React.createClass({
  render(){
    let props = this.props;
    let divStyle = {
      display: "inline-block",
      WebkitTransition: 'all', // note the capital 'W' here
      msTransition: 'all' // 'ms' is the only lowercase vendor prefix
    };
    let subLink;
    let aLink;
    if(props.cover) {
      subLink = "http://i.imgur.com/" + props.cover + "b.jpg";
      aLink = "http://i.imgur.com/" + props.cover + ".jpg";
    } else {
      let len = props.link.length;
      subLink = props.link.substr(0, len-4) + "b" + props.link.substr(len-4, len);
      aLink = props.link.substr(0, len-4) + props.link.substr(len-4, len);
    }

    return (
      <div style={divStyle}>
        <a href = {aLink}>
          <img alt="" src={subLink} height="250px" width="250px" />
        </a>
      </div>
    )
  }
})

module.exports = ImageThumb;