import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";

const ViewFeedbackModal = (props) => {
  return (
    <div className="container">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Feedback Information
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Badge pill bg="dark">
                {props.feedback.feedback_type}
              </Badge>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <Card>
                <Card.Body>{props.feedback.feedback_details}</Card.Body>
              </Card>
             
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewFeedbackModal;
