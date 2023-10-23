import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Feedbacks from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Knowledgebase from "./components/Knowledgebase";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ChatInterface from "./components/ChatInterface";
import ChatPage from "./components/ChatPage";
import VoiceInput from "./components/VoiceInput";
import UserFeedback from "./components/UserFeedback";
import { getUserRole } from "./services/AuthenticationServices";
import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import NavBar2 from './components/NavBar2';
import Footer from './components/Footer';
import ChangePassword from './components/ChangePassword';
import EditProfile from './components/EditProfile';
import Home from "./components/Home";
import MailSuccess from "./components/MailSuccess";
import React, { useState, useEffect } from "react";

const SubAPP = () => {
  // Get the current location using useLocation
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    getUserRole()
      .then((data) => {
        setUserRole(data);
        console.log(userRole);
      })
      .catch((error) => {
        console.error("Error fetching user role:", error);
      });
  }, []);

  // Conditionally render the NavBar based on the current route
  const shouldShowNavBar1 = location.pathname !== '/' && location.pathname !== '/changepassword' && location.pathname !== '/editprofile'&& location.pathname !== '/profile';
  const shouldShowNavBar2 = location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/mailsuccess';
  const shouldShowFooter = location.pathname !== '/';

  return (
    <div className='App'>
      {shouldShowNavBar1 && <NavBar /> } 
      {userRole === "admin" ? <Navigation /> : shouldShowNavBar2 && <NavBar2 />}
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="mailsuccess" element={<MailSuccess />} />
        <Route exact path="signup" element={<Signup />} />
        <Route exact path="login" element={<Login />} />
        {/* <Route exact path="chatbot" element={<Login />} /> */}
        <Route exact path="changepassword" element={<ChangePassword />} />
        {/* <Route exact path="/editprofile/:Email" element={<EditProfile />} />  */}
        <Route exact path="editprofile" element={<EditProfile />} /> 
        <Route path="/" element={<ChatPage />} />
        <Route  path="/adminDashboard/knowledgebase" element={<Knowledgebase />} />
        <Route  path="/adminDashboard" element={<Feedbacks />} />
        <Route exact path="/" element={<Feedbacks />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SubAPP />
    </BrowserRouter>
  );
}
export default App; 



    // <BrowserRouter>
    //   <Navigation />
    //   <Routes>
    //     <Route  path="/adminDashboard/knowledgebase" element={<Knowledgebase />} />
    //     <Route  path="/adminDashboard" element={<Feedbacks />} />
    //     <Route exact path="/" element={<Feedbacks />} />
    //   </Routes>
    // </BrowserRouter>
