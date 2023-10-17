import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from './utils';
import './styles/style.css';
import './styles/snippet.css';
import logo from './images/CSEBOT.png';
import background from './images/dep.png'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showfirstLoginAlert, setShowfirstLoginAlert] = useState(false);
  const [showBadCredentialsAlert, setShowBadCredentialsAlert] = useState(false);
  const [showNotActivatedAlert, setShowNotActivatedAlert] = useState(false);
  // const [userLoggedEmail, setUserLoggedEmail] = useState('');


  const getIsFormValid = () => {
    return validateEmail(email) && password.length >= 8;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        email,
        password,
      });
       const data=response.data;
      if (data.message === "login") {
        // setUserLoggedEmail(data.email);
        // Save userEmail to local storage
        localStorage.setItem('userEmail', JSON.stringify(email));
        setShowLoginAlert(true);
      }else if(data.message === "First login"){
        // setUserLoggedEmail(data.email);
        // Save userEmail to local storage
        localStorage.setItem('userEmail', JSON.stringify(email));
        setShowfirstLoginAlert(true);
      }else if(data.error === "Bad Credintials"){
        setShowBadCredentialsAlert(true);
      }else if(data.error === "User account is not activated."){
        setShowNotActivatedAlert(true);
      }
      clearForm();
    } catch (error) {
      console.error(error);
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
                borderRadius: '25%',
                width: '120px',
                height: '120px',
                margin: '0 auto',

              }}
              src={logo}
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
            Don't have an account?
            <Link to='/signup' className='ms-2'>
              Sign Up Here
            </Link>
          </p>
        </form>
      </div>
      
      <div>
          {/* Account Activated Alert */}
          <div
            className={`modal modal-message modal-success fade ${
              showLoginAlert| showfirstLoginAlert ? "show" : ""
            }`}
            tabIndex='-1'
            role='dialog'
            style={{ display: showLoginAlert|showfirstLoginAlert  ? "block" : "none" }}
          >
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header d-flex justify-content-center'>
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                </div>
                <div className='modal-title'><strong>Success</strong></div>
                <div className='modal-body d-flex flex-column align-items-center'>
                  Logged In!
                </div>
                <div className='modal-footer d-flex justify-content-center'>
                  <button
                    type='button'
                    className='btn btn-success'
                    onClick={() => {
                      setShowLoginAlert(false);
                      if(showfirstLoginAlert && !showLoginAlert){
                        // navigate(`../editprofile/${userLoggedEmail}`);
                        navigate('../editprofile');
                        setShowfirstLoginAlert(false);
                      }else{navigate('../bot');}
                      
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
      {/*Bad Credentials Alert Modal */}
      <div
        className={`modal modal-message modal-danger fade ${
          showBadCredentialsAlert ? "show" : ""
        }`}
        tabIndex='-1'
        role='dialog'
        style={{ display: showBadCredentialsAlert ? "block" : "none" }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-fire center-svg" viewBox="0 0 16 16">
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
            </svg>
            </div>
            <div className='modal-title'><b>Error!</b></div>
            <div className='modal-body d-flex flex-column align-items-center'>Bad Credentials</div>
            <div className='modal-footer d-flex justify-content-center'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => setShowBadCredentialsAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div>
      {/*Account is not activated Alert Modal */}
      <div
        className={`modal modal-message modal-danger fade ${
          showNotActivatedAlert ? "show" : ""
        }`}
        tabIndex='-1'
        role='dialog'
        style={{ display: showNotActivatedAlert ? "block" : "none" }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-fire center-svg" viewBox="0 0 16 16">
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
            </svg>
            </div>
            <div className='modal-title'><b>Error!</b></div>
            <div className='modal-body d-flex flex-column align-items-center'>Account is not activated. Confirm the account through the activation email.</div>
            <div className='modal-footer d-flex justify-content-center'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => setShowNotActivatedAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
