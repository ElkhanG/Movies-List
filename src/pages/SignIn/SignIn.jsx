import React from 'react';
import './SignIn.css';
import Header from '../../components/Header/Header';
const SignInPage = () => {
  return (
    <div className="signin-page">
      <Header />
      <div className="signin-overlay">
        <form className="signin-form">
          <h2 className='sign-in-header'>Sign In</h2>
          <div className="form-group">
            <label htmlFor="email">Email or mobile number</label>
            <input type="text" id="email" placeholder="Enter your email or mobile number" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
          <div className="form-options">
            <div>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/help" className="help-link">Forgot password?</a>
          </div>
          <div className="or-divider">OR</div>
          <button type="button" className="signin-code-button">Use a Sign-In Code</button>
          <div className="signup-link">
            <p>New to Netelix? <a href="/">Sign up now</a>.</p>
          </div>
          <p className="recaptcha-note">
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="/learn-more">Learn more.</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
