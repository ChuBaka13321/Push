const React = require('react');
const { Link } = require('react-router');
const ModalTest = require('./ModalTest')
const { connector } = require('./Store');

const Header = React.createClass({
  testProps: function() {
    console.log('yo')
    this.props.isLoggedIn();
  },

  render(){
    return (
      <header className="header">
        <div className="header-item">
          <Link to={`/`} className="headerLink">
            <h2>Push</h2>
          </Link>
        </div>
        <div>
          <button onClick={this.testProps}>hey</button>
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

module.exports = connector(Header);