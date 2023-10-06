import { useState, useEffect } from "react";
import { validateEmail } from "./utils";
import { Link, useNavigate } from 'react-router-dom';
import './styles/style.css';
import './styles/snippet.css';
import logo from './images/CSEBOT.png';
import background from './images/sliot.png';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [userdetals, setuserdetails] = useState({
    username: "",
    email: "",
    pword: "",
    confirmPword: "",
  });

  const [showPNMAlert, setShowPNMAlert] = useState(false);
  const [showPTSAlert, setShowPTSAlert] = useState(false);
  const [showUEEAlert, setShowUEEAlert] = useState(false);
  const [showAccountCreatedAlert, setShowAccountCreatedAlert] = useState(false);
  const [showRegistrationFailed, setShowRegistrationFailed] = useState(false);
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if(userdetals.username.length >0 &&
      userdetals.pword.length >0 &&
      userdetals.confirmPword.length >0 &&
      validateEmail(userdetals.email)){
        setFormValid(false);
      }
    else{ setFormValid(true);}
       
  },[userdetals.username, userdetals.pword, userdetals.confirmPword]) ;

  const clearForm = () => {
    setuserdetails({
      username: "",
      email: "",
      pword: "",
      confirmPword: ""
    })
    
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    clearForm();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/signup/', userdetals);
      const data =response.data;
      
      if (data === "Passwords didn't matched") {
        setShowPNMAlert(true);
      } else if(data === "Password is too short") {
        setShowPTSAlert(true);
      } else if(data === "Email Already Registered") {
        setShowUEEAlert(true);
      }else if(data === "Your Account has been created succesfully") {
        setShowAccountCreatedAlert(true);
        localStorage.setItem('username', JSON.stringify(userdetals.username));
      }
      
    } catch (error) {
      console.error(error);
      setShowRegistrationFailed(true);
    }
  };

  return (
    <div>
      <div
        className='login template d-flex justify-content-center align-items-center vh-200 bg-primary'
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          paddingBlock: '50px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          className='form_container p-4 rounded'
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
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
          <form onSubmit={handleSubmit}>
            <fieldset>
              <h2 className='text-center'>Sign Up</h2>
              <div className='mb-2'>
                <label>
                  Username <sup style={{ color: 'red' }}>*</sup>
                </label>
                <input
                  value={userdetals.username}
                  type='name'
                  onChange={(e) => {
                    setuserdetails({ ...userdetals, username: e.target.value });
                  }}
                  placeholder='Username'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <label>
                  Email<sup style={{ color: 'red' }}>*</sup>
                </label>
                <input
                  value={userdetals.email}
                  type='email'
                  onChange={(e) => {
                    setuserdetails({ ...userdetals, email: e.target.value });
                  }}
                  placeholder='Email address'
                  className='form-control'
                />
              </div>
              <div className='mb-2'>
                <label>
                  Password<sup style={{ color: 'red' }}>*</sup>
                </label>
                <input
                  value={userdetals.pword}
                  type='password'
                  onChange={(e) => {
                    setuserdetails({ ...userdetals, pword: e.target.value });
                  }}
                  placeholder='Required - 8 or more characters '
                  className='form-control'
                />
              </div>

              <div className='mb-2'>
                <label>
                  Confirm Password <sup style={{ color: 'red' }}>*</sup>
                </label>
                <input
                  value={userdetals.confirmPword}
                  type='password'
                  onChange={(e) => {
                    setuserdetails({ ...userdetals, confirmPword: e.target.value });
                  }}
                  placeholder='Required'
                  className='form-control'
                />
              </div>
              <div className='d-grid'>
                <button
                  className='btn btn-primary'
                  type='submit'
                  disabled={formValid}
                >
                  Create account
                </button>
              </div>
              <p className='text-start mt-2'>
                Do you have an account?
                <Link to='/login' className='ms-2'>
                  Login Here
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
     
      <div>
      {/* Password didn't Match Alert Modal */}
      <div
        className={`modal modal-message modal-danger fade ${
          showPNMAlert ? "show" : ""
        }`}
        tabIndex='-1'
        role='dialog'
        style={{ display: showPNMAlert ? "block" : "none" }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-fire center-svg" viewBox="0 0 16 16">
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
            </svg>
            </div>
            <div className='modal-title'><b>Error!</b></div>
            <div className='modal-body d-flex flex-column align-items-center'>Passwords didn't match!</div>
            <div className='modal-footer d-flex justify-content-center'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => setShowPNMAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div>
      {/* Password too short Alert Modal */}
      <div
        className={`modal modal-message modal-danger fade ${
          showPTSAlert ? "show" : ""
        }`}
        tabIndex='-1'
        role='dialog'
        style={{ display: showPTSAlert ? "block" : "none" }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-fire center-svg" viewBox="0 0 16 16">
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
            </svg>
            </div>
            <div className='modal-title'><b>Error!</b></div>
            <div className='modal-body d-flex flex-column align-items-center'>Password is too short. Required atleast 8 characters.</div>
            <div className='modal-footer d-flex justify-content-center'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => setShowPTSAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div>
      {/* Email already exists Alert Modal */}
      <div
        className={`modal modal-message modal-danger fade ${
          showUEEAlert ? "show" : ""
        }`}
        tabIndex='-1'
        role='dialog'
        style={{ display: showUEEAlert ? "block" : "none" }}
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-fire center-svg" viewBox="0 0 16 16">
              <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
            </svg>
            </div>
            <div className='modal-title'><b>Error!</b></div>
            <div className='modal-body d-flex flex-column align-items-center'>Email already exists.</div>
            <div className='modal-footer d-flex justify-content-center'>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => setShowUEEAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div>
        {/* Mail sent Alert Modal */}
        <div
        className={`modal modal-message modal-info fade ${
          showAccountCreatedAlert ? "show" : ""
        }`}
        tabIndex='-1'
        role='dialog'
        style={{ display: showAccountCreatedAlert ? "block" : "none" }}
      >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header  d-flex justify-content-center">
                        <i class="fa fa-envelope"></i>
                    </div>
                    <div class="modal-title"><b>Information</b></div>

                    <div class="modal-body d-flex flex-column align-items-center">You'vd got mail!</div>
                    <div class="modal-footer d-flex justify-content-center">
                    <button
                type='button'
                className='btn btn-info'
                onClick={() => {
                  setShowAccountCreatedAlert(false);
                  navigate('../mailsuccess');
                }}
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
}

export default Signup;
