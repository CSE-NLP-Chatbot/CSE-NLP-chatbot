import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Link, NavLink,useLocation} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import "../navigation.css"

const Navigation = () => {
  return (
    <div>
      <Navbar expand="lg" className="navbar bg-dark"   data-bs-theme="dark">
        <Container>
          <Link className="navbar-brand" to='/adminDashboard'>Admin Dashboard</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" >
            <NavLink className="nav-item nav-link" to="/adminDashboard" activeClassName="active">Dashboard</NavLink> 
            <NavLink  className="nav-item nav-link" to="/adminDashboard/knowledgebase" activeClassName="active">
              knwoledgebase
            </NavLink>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
