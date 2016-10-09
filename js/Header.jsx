const React = require('react');
const { Link } = require('react-router');
const ModalTest = require('./ModalTest');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');

const Header = React.createClass({
  componentDidMount: function() {
    this.props.checkUser();
  },

  render(){
    let test;
    if(this.props.uid) {
      test = (<h3>{this.props.uid}</h3>)
    } else {
      test = (<h3>Sup yo</h3>)
    }
    return (
      <header className="header">
        <div className="header-item">
          <Link to={`/`} className="headerLink">
            <h2>Push</h2>
          </Link>
        </div>
        <div>
          {test}
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

const mapStateToProps = (state) => { 
  return { 
    uid: state.uid,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUser: () => {
      dispatch(UserActions.checkUser())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header);
