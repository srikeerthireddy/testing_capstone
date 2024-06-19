/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file
import Cookies from 'js-cookie';
import AuthContext from '../AuthContext/AuthContext';

function Login() {
  const [loginUser, setLoginUser] = useState({
    username: '',
    emailId: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchAuthorFromToken = async () => {
      try {
        const token = getCookie('token');
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              })
              .join('')
          );

          const decodedToken = JSON.parse(jsonPayload);

          console.log('Decoded Token:', decodedToken);

          if (decodedToken.username) {
            const { username, emailId } = decodedToken;
            setUsername(username);
            setEmail(emailId);
            setIsSuccess(true); // Set login success state
          } else {
            console.error('Decoded token does not contain a valid username.');
            setError('Failed to load user information.');
          }
        }
      } catch (error) {
        console.error('Error decoding token or fetching user information:', error);
        setError('Failed to load user information.');
      }
    };

    fetchAuthorFromToken();
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handleChange = (e, field) => {
    setLoginUser({ ...loginUser, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5226/api/users/login',
        loginUser
      );
      const data = response.data;

      if (response.status === 200) {
        const { token, username, emailId } = data; // Extract token, username, and email from response
        Cookies.set('token', token); // Store token in cookies
        Cookies.set('username', username); // Store username in cookies
        Cookies.set('emailId', emailId); // Store email in cookies

        setUsername(username);
        setEmail(emailId);

        login(token); // Call the login function with the token
        setMessage(data.message);
        setIsSuccess(true);
      } else {
        setMessage(data.message);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'An error occurred while logging in. Please try again.'
      );
      setIsSuccess(false);
      console.error('An error occurred while logging in:', error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5226/auth/google';
  };

  const handleLogout = () => {
    // Clear cookies or perform any other logout actions as needed
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('emailId');
    setUsername('');
    setEmail('');
    setIsSuccess(false);
    setMessage('');
    // You may want to redirect or perform other cleanup here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="image-container">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2504/2504914.png"
            alt="Google logo"
            className="google-logo"
          />
          {isSuccess && (
            <div className="user-info">
              <p>Welcome, {username}</p>
              <p>Email: {email}</p>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
        {!isSuccess && (
          <>
            {message && (
              <div className="message-succ">
                <div className={`message ${isSuccess ? 'success' : 'error'}`}>
                  <p>{message}</p>
                </div>
              </div>
            )}
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">USER NAME</label>
                <input
                  type="text"
                  id="username"
                  value={loginUser.username}
                  onChange={(e) => handleChange(e, 'username')}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">EMAIL ID</label>
                <input
                  type="email"
                  id="email"
                  value={loginUser.emailId}
                  onChange={(e) => handleChange(e, 'emailId')}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  value={loginUser.password}
                  onChange={(e) => handleChange(e, 'password')}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <div className="google-btn">
              <button onClick={handleGoogleLogin} className="google-login-button">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2504/2504914.png"
                  alt="Google logo"
                  className="google-logo"
                />
                Continue with Google
              </button>
            </div>

            <p className="sign">
              Don't have an account? <Link to="/signin">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
