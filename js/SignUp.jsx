const React = require('react');
const Header = require('./Header');
const { connector } = require('./Store');

const SignUp = React.createClass({
  onChange: function() {
    this.passwordMatch()
    this.minLength()
  },

  passwordMatch: function() {
    if(this.refs.passForm.value !== this.refs.confirmPass.value) {
      // set error message
      this.refs.confirmPass.setCustomValidity('Passwords do not match.');
    } else {
      // this means that the passwords match and are okay
      this.refs.confirmPass.setCustomValidity('');
    }
  },

  minLength: function() {
    if(this.refs.passForm.value.length < 6) {
      this.refs.passForm.setCustomValidity('Password needs to be at least 6 characters please.');
    } else {
      this.refs.passForm.setCustomValidity('');
    }
  },
  
  signUp: function(event) {
    console.log(this.props)
    event.preventDefault()
  },

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form id="myform" onSubmit={this.signUp}>
          <label>Email</label>
          <input type="text" name="signUpEmail" id="emailFormId" required/>

          <label>Password</label>
          <input type="text" name="signUpPass" id="passwordForm" required ref="passForm" onChange = { this.onChange }/>

          <label>Confirm Password</label>
          <input type="text" name="signUpConfirmPass" id="confirmPasswordForm" required ref="confirmPass" onChange = { this.passwordMatch }/>
          <button type="submit" id="mysubmit">Sign Up</button>
        </form>
      </div>
    )
  }
});

module.exports = connector(SignUp);