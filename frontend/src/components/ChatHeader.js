import React from "react";
import { useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Button,
  Row,
  Col,
  Figure,
  Offcanvas,
} from "react-bootstrap";
// import "./header.css";
import uom_logo from "../assets/uom_logo.png";
import cse_logo from "../assets/cse_logo.png";
import user from "../assets/user.svg";
import UserFeedback from "./UserFeedback";

// "#252830"

function ChatHeader() {
  let userName = "user2";

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container className="mb-0 mt-1" style={{ maxHeight: "70px" }}>
          <Navbar.Brand href="#chatbot">
            <Row xs={6} lg={3} sm={12}>
              <Col
                xs={12}
                lg={12}
                sm={12}
                style={{ maxWidth: "90px", overflow: "hidden" }}
              >
                <img
                  alt="UoM Logo"
                  src={uom_logo}
                  className="d-inline-block img-fluid"
                />
              </Col>
              {/* <Col
                xs={6}
                lg={3}
                sm={3}
                style={{ maxWidth: "128px", overflow: "hidden" }}
              >
                <img
                  alt="CSE Logo"
                  src={cse_logo}
                  className="d-inline-block img-fluid"
                />
              </Col> */}
            </Row>
            <div
              className="container m-1 wrapper"
              style={{ fontSize: "0.8em" }}
            >
              CSE
            </div>
            {/* <Figure className="m-1">
              <Figure.Image
                className="responsive-image"
                aria-hidden="true"
                // width={108}
                // height={122}
                alt="UoM Logo"
                src={uom_logo}
              />
              <Figure.Image
                className="responsive-image"
                // width={108}
                // height={122}
                alt="CSE Logo"
                src={cse_logo}
              />
              <Figure.Caption>Computer Science & Engineering</Figure.Caption>
            </Figure> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="p-3 w-100 rounded-3 shadow-sm bg-white"
            id="responsive-navbar-nav"
            style={{
              zIndex: 99,
            }}
          >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "20px" }}
              navbarScroll
            >
              {/* <Nav.Link href="#Feedbacks">Feedbacks</Nav.Link> */}

              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
            <Nav>
              <Button
                variant="outline-dark"
                href="#Feedbacks"
                style={{ margin: "5px" }}
                onClick={handleShow}
              >
                Feedbacks
              </Button>
              <Button
                variant="outline-dark"
                href="#Logout"
                style={{ margin: "5px" }}
              >
                Logout
              </Button>
              <Nav.Link eventKey={2} href="#memes">
                Signed in as : {userName}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Feedback Form</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div class="container">
            <p style={{ textAlign: "justify", marginTop: -35 }}>
              Welcome to our feedback form for assessing the accuracy and
              performance of our chatbot. This form comprises two key sections:
            </p>
            <ol style={{ textAlign: "justify" }}>
              <li>
                Accuracy Feedback: Please provide feedback in the format of your
                <b>question</b>, the chatbot's <b>response</b>, and your{" "}
                <b>thoughts</b> on why it was inaccurate. This helps us pinpoint
                and address specific issues.
              </li>
              <li>
                Performance Feedback: Share your experiences or concerns related
                to the chatbot's performance, such as latency and response
                speed.
              </li>
            </ol>
            <p style={{ textAlign: "justify" }}>
              When providing feedback, be specific and constructive. You can
              submit multiple instances of feedback. Your input is invaluable
              for improving our chatbot. We kindly appreciate your valuable
              feedback.
            </p>
          </div>

          <UserFeedback />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default ChatHeader;
