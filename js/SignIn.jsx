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
        <h1>Sign In</h1>
        <form id="myform" onSubmit={this.signInUser}>
          <label>Email</label>
          <input type="text" name="signUpEmail" ref="email" id="emailFormId" required/>

          <label>Password</label>
          <input type="text" name="signUpPass" id="passwordForm" required ref="passForm" onChange = { this.onChange }/>
          <button type="submit" id="mysubmit">Sign In</button>
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