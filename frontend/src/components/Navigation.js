import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <div>
      <Navbar className="navbar"  data-bs-theme="dark">
        <Container>
          <Link className="navbar-brand" to='/'>Admin Dashboard</Link>
          <Nav className="me-auto">
            <NavLink  className="nav-item nav-link" to="/adminDashboard/knowledgebase">
              knwoledgebase
            </NavLink>
            <NavLink className="nav-item nav-link" to="/adminDashboard">Dashboard</NavLink> 
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
