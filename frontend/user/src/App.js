import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Login from './components/Login';
import Signup from './components/Signup';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const router = createBrowserRouter([
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
])

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <RouterProvider router={router} />
      <Footer/>
    </div>
  );
}

export default App;
