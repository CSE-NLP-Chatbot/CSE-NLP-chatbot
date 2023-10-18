import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Feedbacks from './components/Dashboard';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Footer from './components/Footer';


function App() {
  return (
    <div className='App'>
      <NavBar/>
      <BrowserRouter>
        {/* <Navigation /> */}
        <Routes>
          <Route exact path="/" element={<Feedbacks/>} />
          <Route exact path="signup" element={<Signup />} />
          <Route exact path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
    
  );
}

export default App;