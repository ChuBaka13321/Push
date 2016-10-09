const React = require('react');
const SignUp = require('./SignUp')
const SignIn = require('./SignIn')

const ModalTest = React.createClass({
///////testing two components
  getInitialState: function () {
    return {
        active: 'SIGNUP'
    };
  },

  toggleSignUp: function () {
    this.setState({
        active: "SIGNUP"
    });
  },

  toggleSignIn: function () {
    this.setState({
        active: "SIGNIN"
    });
  },

  openModal: function() {
    this.refs.testingRef.style.display = "block";
  },

  closeModal: function() {
    this.refs.testingRef.style.display="none";
  },

  //clickoutside of the modal, closes it
  clickOutside: function(event) {
    if (event.target === this.refs.testingRef) {
        this.refs.testingRef.style.display = "none";
    }
  },

  componentDidMount: function() {
    window.addEventListener('click', this.clickOutside);
  },

  componentWillUnmount: function() {
    console.log('modaltest unmounted')
    window.removeEventListener('click', this.clickOutside);
  },

  render() {
    const active = this.state.active;
    let modal;
    if(active === 'SIGNUP') {
      modal = <SignUp />;
    } else if(active === 'SIGNIN') {
      modal = <SignIn />;
    };
    return (
      <div>
        <button id="myBtn" onClick={this.openModal}>Sign Up/Sign In</button>

        <div id="myModal" className="modal" ref="testingRef">
        
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>x</span>
            <button type="button" onClick={this.toggleSignUp}>
              Sign Up
            </button>
            <button type="button" onClick={this.toggleSignIn}>
              Sign In
            </button>
            {modal}
          </div>

        </div>
      </div>
    )
  }
});

module.exports = ModalTest;
