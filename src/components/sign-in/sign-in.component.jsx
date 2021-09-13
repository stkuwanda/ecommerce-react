import React from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import { signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ email: "", password: "" });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span className='title'>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            required
            label='Email'
          />
          <FormInput
            type='password'
            name='password'
            value={this.state.password}
            onChange={this.handleChange}
            required
            label='Password'
          />
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton onClick={signInWithGoogle}>Sign In With Google</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignIn;
