import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/user/user.actions";

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { email, password } = userCredentials;

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailSignIn = (email, password) =>
      dispatch(emailSignInStart({ email, password }));

    console.log("handleSubmit email", email);

    emailSignIn(email, password);

    setCredentials({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  const googleSignIn = () => dispatch(googleSignInStart());

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
          <CustomButton type='button' onClick={googleSignIn} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
