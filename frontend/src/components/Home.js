import { Helmet } from 'react-helmet';
import background from './images/Robot.png';
import './styles/home.css';
import React,{ Component } from 'react';
import Typed from 'react-typed';
import 'react-typed/dist/animatedCursor.css';
 

const Home = () => {
  return (
    <div>
        <Helmet>   
        <link
          rel="stylesheet"
          href="https://cdn.oaistatic.com/_next/static/css/27dc37929106858f.css"
        />
      </Helmet>
      <body className="antialiased" style={{ backgroundColor: 'rgba(0,0,46)' }}>
        <div id="__next">
        <div className="flex min-h-full w-screen flex-col sm:supports-[min-height:100dvh]:min-h-[100dvh] md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
                <div className="relative hidden flex-1 flex-col justify-center px-5 pt-8 text-[#FE7600] dark:text-[#D292FF] md:flex md:px-6 md:py-[22px] lg:px-8">
                    <nav className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
                        <h1>
                            <div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px]">
                                <div style={{fontSize:'30px' }}>CSEBOT <span className="font-circle">●</span></div>
                            </div>
                        </h1>
                    </nav>
                <div className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]" aria-hidden="false">
                    
                <div class="font-bold" style={{ fontStyle:'revert-layer' }}><Typed strings={['Sort out<br>your CSE-related matters with ease',
                "Give me academic timetables",
                "What is the total number of credits<br>required to complete the CSE program?",
                "What courses are offered in the CSE program?",
                "How long are the courses and<br>when are they offered?",
                "What are the events that will be held<br>by the CSE Department?",
                "Who are the senior lecturers in<br>the department?",
                "Who are the visiting lecturers in<br>the department?",
                "Who are the professors in the department?",
                "Who is the head of the department?",
                "What types of projects are typically<br>undertaken in the Final Year Project Lab?",
                "What are the requirements for<br>graduating from the CSE department?",
                "I have an academic matter.<br>Who should I contact?",
                "Who are the semester coordinators<br>of CSE department?",
                "Who is the academic coordinator<br>of the CSE department?",
                "I was late to register for a repeat module.<br>What can I do now?"]} typeSpeed={100} backSpeed={30}  loop cursorChar='●'/></div>
                
    </div>
</div>
<div className="relative flex grow flex-col items-center justify-between bg-white px-5 py-8 text-black dark:bg-black dark:text-white sm:rounded-t-[30px] md:rounded-none md:px-6" style={{ minHeight: '100vh', backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    paddingBlock: '50px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    
     
   }} >
    
    <div className="relative flex w-full grow flex-col items-center justify-center" >
        <h2 className="text-with-border text-center text-[30px] leading-[1.2] md:text-[42px] md:leading-8" style={{ color: '#882afa', fontSize:"60px"}}>Get started</h2>
        <div className="mt-5 w-full max-w-[440px]">
            <div className="grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
                <button className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]" data-testid="login-button">
                    <div className="relative -top-[1px]"><a href="/login">LogIn</a></div>
                </button>
                    <button className="relative flex h-12 items-center justify-center rounded-md text-center text-base font-medium bg-[#3C46FF] text-[#fff] hover:bg-[#0000FF]">
                        <div className="relative -top-[1px]"><a href="/signup">SignUp</a></div>
                    </button>
                </div>
            </div>
        </div>
        <div className="mt-10 flex flex-col justify-center ">
            <div className="py-3 text-xs" style={{ color: 'white' }}>
                <a href="#" target="_blank" className="mx-3 text-white-500" rel="noreferrer">Terms of use</a>
                <span className="text-gray-600">|</span>
                <a href="#" target="_blank" className="mx-3 text-white-500" rel="noreferrer">Privacy policy</a>
            </div>
        </div>
    </div>
</div>
      <div>
      </div>
</div>
</body>
</div>
  );
};

export default Home;
