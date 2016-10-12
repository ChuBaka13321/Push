const React = require('react');
const Header = require('./Header');
const { connector } = require('./Store');
const ReactRedux = require('react-redux');
const UserActions = require('./UserActions');

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
  
  closeModal: function() {
    document.getElementById("myModal").style.display = "none";  
  },

  signUp: function(event) {
    event.preventDefault()
    const email = this.refs.email.value;
    const pass = this.refs.passForm.value;
    this.props.signUpUser(email, pass);
    this.closeModal();
  },



  render() {
    return (
      <div>
        <div className = "modalHeader">
          <h2>Sign Up</h2>
          <small>Welcome friend!</small>
        </div>
        <form id="myform" onSubmit={this.signUp}>
          <input type="text" ref="email" placeholder="Email" required/>

          <input type="password" placeholder="Password" required ref="passForm" onChange = { this.onChange }/>

          <input type="password" placeholder="Confirm Password" required ref="confirmPass" onChange = { this.passwordMatch }/>
          <button type="submit" className="userSubmit">Sign Up</button>
        </form>
      </div>
    )
  }
});

const mapStateToProps = (state) => { 
  return { 
    uid: state.uid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (email, pass) => {
      dispatch(UserActions.signUp(email, pass))
    }
  }
}

// module.exports = ReactRedux.connect(mapDispatchToProps)(SignUp);
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SignUp);

// module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SignUp);
// module.exports = SignUp;
// module.exports = connector(SignUp);