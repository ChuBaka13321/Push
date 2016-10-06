const React = require('react');
const Header = require('./Header');

const SignIn = React.createClass({
  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form id="myform" action='/' method="post">
          <label>Email</label>
          <input type="text" name="signInEmail" id="emailFormId" required/>

          <label>Password</label>
          <input type="text" name="signInPass" id="passwordForm" required/>
          <button type="submit" id="mysubmit">Sign In</button>
        </form>
      </div>
    )
  }
});

module.exports = SignIn;