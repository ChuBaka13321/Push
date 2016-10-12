const React = require('react');
const Header = require('./Header');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');

const SignIn = React.createClass({
  closeModal: function() {
    document.getElementById("myModal").style.display = "none";  
  },
  signInUser:function(event) {
    event.preventDefault()
    const email = this.refs.email.value;
    const pass = this.refs.passForm.value;
    this.props.signInUser(email, pass)
    this.closeModal();
  },

  render() {
    return (
      <div>
        <div className = "modalHeader">
          <h2>Sign In</h2>
          <small>Welcome back!</small>
        </div>
        <form id="myform" onSubmit={this.signInUser}>
          <input type="text" ref="email" placeholder="Email" required/>

          <input type="password" placeholder="Password" required ref="passForm" onChange = { this.onChange }/>
          <button type="submit" className="userSubmit">Sign In</button>
        </form>
      </div>
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
    signInUser: (email, pass) => {
      dispatch(UserActions.signInUser(email, pass))
    }
  }
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SignIn);
// module.exports = SignIn;