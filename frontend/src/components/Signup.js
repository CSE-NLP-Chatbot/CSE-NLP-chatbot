import { useState } from "react";
import { validateEmail } from "./utils";
import {Link} from 'react-router-dom'
import './styles/style.css'
import logo from './images/CSEBOT.png';
import background from './images/sliot.png';

const PasswordErrorMessage = () => {
  return (
    <p style={{color: 'red', fontSize: '12px'}}>Password should have at least 8 characters</p>
  );
};
const PasswordNotMatchedErrorMessage = () => {
    return (
      <p style={{color: 'red', fontSize: '12px'}}>Passwords do not match</p>
    );
  };

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [role, setRole] = useState("role");

  const handlePasswordChange = (event) => {
    setPassword({ ...password, value: event.target.value });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword({ ...confirmPassword, value: event.target.value });
    if (event.target.value === password.value){
        setPasswordMatch(true);
    }
    else{ setPasswordMatch(false);};
  };

  const getIsFormValid = () => {
    return ( 
        firstName && 
        validateEmail(email) && 
        password.value.length >= 8 && 
        passwordMatch &&
        role !== "role" 
      ); 
  };

  const clearForm = () => {
    setFirstName(""); 
   setLastName(""); 
   setEmail(""); 
   setPassword({ 
    value: "", 
    isTouched: false, 
  }); 
   setConfirmPassword({ 
    value: "", 
    isTouched: false, 
  }); 
   setRole("role");
  };

  const handleSubmit = (event) => {
   event.preventDefault(); 
   alert('Account created!');
   clearForm();
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-200 bg-primary' style={{ backgroundImage: `url(${background})` , backgroundSize: 'cover', paddingBlock: '50px',
    backgroundRepeat: 'no-repeat', 
    } }>
      <div className='form_container p-4 rounded' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
            <h2 className="fw-light text-info mb-5">
                <img
                  style={{
                    display: "flex",
                    width: "100px",
                    height: "100px",
                    margin: "0 auto"
                  }}
                  src={logo}
                />
            </h2>
            <form onSubmit={handleSubmit}>
                <fieldset>
                <h2 className='text-center'>Sign Up</h2>
                <div className='mb-2'>
                    <label>
                    First name <sup style={{ color: 'red' }}>*</sup>
                    </label>
                    <input 
                        value={firstName} 
                        onChange={(e) => { 
                        setFirstName(e.target.value); 
                        }} 
                        placeholder="First name"
                        className='form-control' 
                    />
                </div>
                <div className='mb-2'>
                    <label>
                        Last name
                    </label>
                    <input 
                        value={lastName} 
                        onChange={(e) => { 
                        setLastName(e.target.value); 
                        }} 
                        placeholder="Last name" 
                        className='form-control'
                    />
                </div>
                <div className='mb-2'>
                    <label>
                        Email<sup style={{ color: 'red' }}>*</sup>
                    </label>
                    <input
                        value={email} 
                        onChange={(e) => { 
                        setEmail(e.target.value); 
                        }} 
                        placeholder="Email address" 
                        className='form-control'
                    />
                </div>
                <div className='mb-2'>
                    <label>
                        Password <sup style={{ color: 'red' }}>*</sup>
                    </label>
                    <input 
                        value={password.value} 
                        type="password" 
                        onChange= {handlePasswordChange}
                        onBlur={() => { 
                            setPassword({ ...password, isTouched: true }); 
                        }}
                        placeholder="required" 
                        className='form-control'
                    />
                   
                    
                </div>
                <div>
                    {password.isTouched && password.value.length < 8 ? ( 
                        <PasswordErrorMessage /> 
                    ) : null}
                </div>
                <div className='mb-2'>
                    <label>
                        Confirm Password <sup style={{ color: 'red' }}>*</sup>
                    </label>
                    <input 
                        value={confirmPassword.value} 
                        type="password" 
                        onChange= {handleConfirmPasswordChange}
                        onBlur={() => { 
                            setConfirmPassword({ ...confirmPassword, isTouched: true }); 
                        }}
                        placeholder="required" 
                        className='form-control'
                    />

                {confirmPassword.isTouched && !passwordMatch ? ( 
                    <PasswordNotMatchedErrorMessage /> 
                ) : null}
                    
                </div>

                <div></div>

                <div className='mb-2'>
                    <label>
                    Role <sup style={{ color: 'red' }}>*</sup>
                    </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className='form-control'>
                    <option value="role">Role</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    </select>
                </div>
                <div className='d-grid'>
                    <button className='btn btn-primary' type="submit" disabled={!getIsFormValid()}>
                        Create account
                    </button>
                </div>
                <p className='text-start mt-2'>
                        Already Registered? <Link to='/login' className='ms-2'>Log in</Link>
                    </p>
                </fieldset>
            </form>
        </div>
    </div>
  )
}

export default Signup;
