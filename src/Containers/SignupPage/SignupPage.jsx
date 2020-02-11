import React, { Component } from "react";
import SignupForm from "../../components/signupFrom/signupForm";
import { connect } from "react-redux";
import { userSignupRequest } from "../../actions/signupActions";
import PropTypes from "prop-types";

class SignupPage extends Component {
  state = {};
  render() {
    const { userSignupRequest } = this.props;
    return (
      <div className="row">
        <div className="col-md-4">
          <SignupForm userSignupRequest={userSignupRequest} />
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default connect(null, { userSignupRequest })(SignupPage);
