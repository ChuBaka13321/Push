const React = require('react');
const { Link, browserHistory } = require('react-router');
const SignUpIn = require('./SignUpIn');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');

const Header = React.createClass({
  componentWillMount: function() {
    this.props.checkUser();
  },

  signOut: function() {
    this.props.signOut();
    browserHistory.push('/');
  },

  render(){
    let signInOrOut;
    if(this.props.email && this.props.uid) {
      signInOrOut = (
        <div className="dropdown">
          <button className="dropbtn">
            {this.props.email}
          </button>
          <div className="dropdown-content">
            <Link to={`/favorites`}>
              Favorites
            </Link>
            <Link onClick = {this.signOut}>
              Sign Out
            </Link>
          </div>
        </div>
      )
    } else {
      signInOrOut = (<SignUpIn />);
    }
   
    return (
      <header className="header">
        <div className="header-item">
          <Link to={`/`} className="headerLink">
            Push
          </Link>
        </div>
        <div className="header-item">
          {signInOrOut}
        </div>
      </header>
    )
  }
});

const mapStateToProps = (state) => { 
  return { 
    email: state.email,
    uid: state.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkUser: () => {
      dispatch(UserActions.checkUser())
    },
    signOut: () => {
      dispatch(UserActions.signOut())
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Header);
