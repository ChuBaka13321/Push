const React = require('react');
const { Link, browserHistory } = require('react-router');
const Modal = require('./Modal');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');

const Header = React.createClass({
  componentDidMount: function() {
    console.log(this.props, 'header props')
    this.props.checkUser();
  },

  signOut: function() {
    this.props.signOut();
    browserHistory.push('/')
  },

  render(){
    let signInOrOut;
    if(this.props.email && this.props.uid) {
      // signInOrOut = (<button type="button" onClick = {this.props.signOut} >Sign Out</button>)
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
      signInOrOut = (<Modal />);
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
