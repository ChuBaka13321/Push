const React = require('react');
const { Link } = require('react-router');
const ModalTest = require('./ModalTest')

const Header = React.createClass({
  render(){
    return (
      <header className="header">
        <div className="header-item">
          <Link to={`/`} className="headerLink">
            <h2>Push</h2>
          </Link>
        </div>
        <div className="header-item">
          <ModalTest/>
        </div>
        <div className="header-item">
          <Link to={`/favorites`} className="headerLink">
            <h2>Favorites</h2>
          </Link>
        </div>
      </header>
    )
  }
});

module.exports = Header