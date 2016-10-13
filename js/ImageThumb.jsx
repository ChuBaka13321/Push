const React = require('react');
const Header = require('./Header');
const { Link } = require('react-router');


// stateless component
const ImageThumb = function(props) {
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
    <Link to={`/details/${props.id}`}>
      <div className="images">
        <img alt="" src={subLink} height="250px" width="250px" />
      </div>
    </Link>
  )
}

module.exports = ImageThumb;
