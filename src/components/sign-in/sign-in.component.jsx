import React, { useState } from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/user/user.actions";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { googleSignInStart } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { emailSignInStart } = props;

    emailSignInStart(email, password);

    setEmail("");
    setPassword("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span className='title'>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          required
          label='Email'
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          required
          label='Password'
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton
            type='button'
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
