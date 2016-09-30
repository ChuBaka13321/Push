const React = require('react');
const Header = require('./Header');

const SignUp = React.createClass({
  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <form id="myform" action='/' method="post">
          <label>Email</label>
          <input type="text" name="emailForm" id="emailFormId" required/>

          <label>Password</label>
          <input type="text" name="passForm" id="passwordForm" required/>

          <label>Confirm Password</label>
          <input type="text" name="confirmPassForm" id="confirmPasswordForm" required/>
          <button type="submit" id="mysubmit">Sign Up</button>
        </form>
      </div>
    )
  }
});

module.exports = SignUp;