const React = require('react');
const SignUp = require('./SignUp')
const SignIn = require('./SignIn')
const { Link } = require('react-router');

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

  openModalSignUp: function() {
    this.toggleSignUp();
    this.refs.modalRef.style.display = "block";
  },

  openModalSignIn: function() {
    this.toggleSignIn();
    this.refs.modalRef.style.display = "block";
  },

  closeModal: function() {
    this.refs.modalRef.style.display="none";
  },

  //clickoutside of the modal, closes it
  clickOutside: function(event) {
    if (event.target === this.refs.modalRef) {
        this.refs.modalRef.style.display = "none";
    }
  },

  componentDidMount: function() {
    window.addEventListener('click', this.clickOutside);
  },

  componentWillUnmount: function() {
    window.removeEventListener('click', this.clickOutside);
  },

  render() {
    const active = this.state.active;
    let modal;
    let modalSignUpOrIn;
    if(active === 'SIGNUP') {
      modal = <SignUp />;
      modalSignUpOrIn = (
        <div>
          <h4>Already have an <Link onClick={this.toggleSignIn}>account?</Link></h4>
        </div>
      )
    } else if(active === 'SIGNIN') {
      modalSignUpOrIn = (
        <div>
          <h4>Need an <Link onClick={this.toggleSignUp}>account?</Link></h4>
        </div>
      )
      modal = <SignIn />;
    };
    return (
      <div>
        <button className="signUpIn" onClick={this.openModalSignUp}>Sign Up</button><button className="signUpIn" onClick={this.openModalSignIn}>Sign In</button>
        <div id="myModal" className="modal" ref="modalRef">
          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>x</span>
            {modal}
            {modalSignUpOrIn}
          </div>

        </div>
      </div>
    )
  }
});

// work in progress, get modal to close via redux state change
// const mapStateToProps = (state) => { 
//   return { 
//     images: state.uid,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signUpUser: (email, pass) => {
//       dispatch(UserActions.signUp(email, pass))
//     }
//   }
// }

// module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ModalTest);

module.exports = ModalTest;
