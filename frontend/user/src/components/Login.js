import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from './utils';
import './styles/style.css';
import logo from 'D:/my_projects/CSE-NLP-chatbot/frontend/user/src/images/CSEBOT.png';
import background from 'D:/my_projects/CSE-NLP-chatbot/frontend/user/src/images/dep.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const getIsFormValid = () => {
    return validateEmail(email) && password.length >= 8;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      if (response.data.success) {
        setMessage('Login successful!');
        alert('Logged In!');
      } else {
        setMessage('Invalid email or password.');
      }
      clearForm();
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while logging in.');
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword({
      value: '',
      isTouched: false,
    });
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary' style={{ backgroundImage: `url(${background})` }}>
      <div className='form_container p-5 rounded' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <h2 className='fw-light text-info mb-5'>
          <img
            style={{
              display: 'flex',
              width: '100px',
              height: '100px',
              margin: '0 auto',
            }}
            src={logo}
            alt='Logo'
          />
        </h2>
        <form onSubmit={handleLogin}>
          <h3 className='text-center'>Log In</h3>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              placeholder='Enter Password'
              className='form-control'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <input type='checkbox' className='custom-control custom-checkbox' id='check' />
            <label htmlFor='check' className='custom-input-label ms-2'>
              Remember me
            </label>
          </div>
          <div className='d-grid'>
            <button type='submit' className='btn btn-primary' disabled={!getIsFormValid()}>
              Log in
            </button>
          </div>
          <p className='text-start mt-2'>
            Forgot <a href=''>Password?</a>
            <Link to='/signup' className='ms-2'>
              Sign up
            </Link>
          </p>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Login;
