const React = require('react');

const ModalTest = React.createClass({

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
    console.log(event.target === this.refs.testingRef)
  },

  componentDidMount: function() {
    window.addEventListener('click', this.clickOutside);
  },

  componentWillUnmount: function() {
    window.removeEventListener('click', this.clickOutside);
  },

  render() {
    return (
      <div>
        <button id="myBtn" onClick={this.openModal}>SignUp</button>

        <div id="myModal" className="modal" ref="testingRef">

          <div className="modal-content">
            <span className="close" onClick={this.closeModal}>x</span>
            <form id="myform" method="post">
              <label>Username</label>
              <input type="text" name="nameForm" id="usernameForm" required/>

              <label>Password</label>
              <input type="text" name="passForm" id="passwordForm" required/>
              <button type="submit" id="mysubmit">Submit</button>
            </form>
          </div>

        </div>
      </div>
    )
  }
});

module.exports = ModalTest;