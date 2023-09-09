import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./styles/navbar.css";
import logo from 'D:/my_projects/CSE-NLP-chatbot/frontend/user/src/images/CSEBOT.png';

function NavBar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<div style={{ display: "flex", alignItems: "center" }}>
        <a className="navbar-brand" href="/">
          <img
            style={{
              width: "40px",
              height: "36px",
              paddingTop: "0px",
              marginTop: "2px",
              transform: "scale(1.5)",
              paddingRight: "0px",
              marginLeft: "10px", // Adjust the margin as needed
              marginRight: "10px", // Adjust the margin as needed
              borderRadius: "90%",
              border: "1px solid #ffffff",
            }}
            src={logo}
            alt="Logo"
          />
        </a>
        <h3 style={{ color: "white", marginTop: "2px",marginLeft: "10px" }}>CSEBOT</h3>
      </div>
			<nav ref={navRef}>
				<a href="/#">Home</a>
				<a href="/login" style={{}}>LogIn</a>
				<a href="/signup">SignUp</a>
				<a href="/#">AboutUs</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default NavBar;