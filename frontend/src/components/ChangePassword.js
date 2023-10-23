import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import background from './images/Robot.png';


function ChangePassword() {
  const navigate = useNavigate();
  const [userdetails, setuserdetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [Email, setEmail] = useState('');
  const [showPNMAlert, setShowPNMAlert] = useState(false);
  const [showPTSAlert, setShowPTSAlert] = useState(false);
  const [showDetailsSavedAlert, setShowDetailsSavedAlert] = useState(false);
  const [showBadCredentialsAlert, setShowBadCredentialsAlert] = useState(false);

  // Load user details from local storage when the component mounts
  useEffect(() => {
    const savedUserEmail = JSON.parse(localStorage.getItem('userEmail'));

    if (savedUserEmail) {
      setEmail(savedUserEmail);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
       // Save user details to local storage
      const response = await axios.put('http://127.0.0.1:8000/changepassword/', { ...userdetails, email: Email });
      const data = response.data;
      console.log(data);
      if (data === "Passwords didn't matched") {
        setShowPNMAlert(true);
      }else if(data === "Password is too short"){
        setShowPTSAlert(true);

      }else if(data === "password changed successfully"){
        setShowDetailsSavedAlert(true);
        
      }else if(data === "Bad Credintials"){
        setShowBadCredentialsAlert(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <div style={{ minHeight: '100vh', backgroundImage: `url(${background})`,
    paddingBlock: '50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
   }} >
    <div className="container" >
      <div className="content-header">
        <div className="container">
          <div className="row mb-2" style={{paddingTop:'0px'}}>
            <div className="col-lg-7 col-md-7 col-sm-12">
              <h1 className="fs24 page-header-title" style={{ textAlign: 'left', color:'#FFFFFF', margin:'0px 0px 8px', opacity: 0.5}}>Change Password</h1>
              <p className="m-0 mb-3 fs16 page-header-desc fs20"><br /></p>
            </div>
            <div className="col-lg-5 col-md-5 col-sm-12 mb-1">
              <div className="img-boxes"></div>
            </div>
          </div>
        </div>
      </div>

       {/* Adjust the height value above as needed style={{ height: 'calc(100vh - 100px)', paddingTop:'30px'}}*/}
       <div className="main" style={{ height: 'calc(120vh - 100px)', paddingTop:'30px'}} onSubmit={handleSubmit}>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-6">
                <form action="/users/edit_profile" id="UserEditProfileForm" method="post" acceptCharset="utf-8">
                  <div style={{ display: 'none' }}>
                    <input type="hidden" name="_method" value="POST" />
                  </div>
                  <div className="card" style={{ minHeight: '300px', width: '100%',backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12" style={{ color: '#182359D9', margin: '0px 0px 8px' }}>
                          <div className="form-group" style={{ textAlign: 'left', fontSize: '20px', paddingTop: '20px', paddingBottom: '10px' }}>
                            <label style={{ paddingBottom: '10px' }}>Current Password</label>
                            <input
                              value={userdetails.currentPassword}
                              type='password'
                              onChange={(e) => {
                                setuserdetails({ ...userdetails, currentPassword: e.target.value });
                              }}
                              placeholder='Current password'
                              className='form-control'
                              required="required"
                              style={{ paddingBottom: '10px', paddingTop: '10px' }}
                            />
                          </div>
                          <div className="form-group" style={{ textAlign: 'left', fontSize: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                            <label style={{ paddingBottom: '10px' }}>New Password</label>
                            <input
                              value={userdetails.newPassword}
                              type='password'
                              onChange={(e) => {
                                setuserdetails({ ...userdetails, newPassword: e.target.value });
                              }}
                              placeholder='New password'
                              className='form-control'
                              required="required"
                              style={{ paddingBottom: '10px', paddingTop: '10px' }}
                            />
                          </div>
                          <div className="form-group" style={{ textAlign: 'left', fontSize: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                            <label style={{ paddingBottom: '10px' }}>Confirm New Password</label>
                            <input
                              value={userdetails.confirmNewPassword}
                              type='password'
                              onChange={(e) => {
                                setuserdetails({ ...userdetails, confirmNewPassword: e.target.value });
                              }}
                              placeholder='Confirm new password'
                              className='form-control'
                              required="required"
                              style={{ paddingBottom: '10px', paddingTop: '10px' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer" style={{ textAlign: 'left', paddingTop: '20px', paddingBottom: '20px' }}>
                      <button className="btn icon-btn-save btn-info btn-fill" type="submit"  style={{ fontSize: '18px', padding: '8px 25px', color: '#FFF', backgroundColor: '#86D4F5' }}>Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
    <div>
          {/* Password changed Alert */}
          <div
            className={`modal modal-message modal-success fade ${
              showDetailsSavedAlert ? "show" : ""
            }`}
            tabIndex='-1'
            role='dialog'
            style={{ display: showDetailsSavedAlert  ? "block" : "none" }}
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
                  Password Changed!
                </div>
                <div className='modal-footer d-flex justify-content-center'>
                  <button
                    type='button'
                    className='btn btn-success'
                    onClick={() => {
                      setShowDetailsSavedAlert(false);
                      if (showDetailsSavedAlert) {
                        navigate("../bot");
                      }
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
    </div>
  );
}

export default ChangePassword;
