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

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");

  const getIsFormValid = () => {
    return ( 
        firstName && 
        validateEmail(email) && 
        password.value.length >= 8 && 
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
   setRole("role");
  };

  const handleSubmit = (e) => {
   e.preventDefault(); 
   alert("Account created!");
   clearForm();
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary' style={{ backgroundImage: `url(${background})` , backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat', 
    } }>
      <div className='form_container p-4 rounded' style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
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
                        onChange={(e) => { 
                            setPassword({ ...password, value: e.target.value }); 
                        }} 
                        onBlur={() => { 
                            setPassword({ ...password, isTouched: true }); 
                        }} 
                        placeholder="Password" 
                        className='form-control'
                    />
                    {password.isTouched && password.value.length < 8 ? ( 
                    <PasswordErrorMessage /> 
                ) : null}
                </div>
                <div className='mb-2'>
                    <label>
                    Role <sup style={{ color: 'red' }}>*</sup>
                    </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className='form-control'>
                    <option value="role">Role</option>
                    <option value="individual">Undergraduate</option>
                    <option value="business">Postgraduate</option>
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
