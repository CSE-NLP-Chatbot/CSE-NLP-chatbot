import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Form } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { updateKnowledgebase } from "../services/UpdateKnowledgebaseServices";
import { deleteFeedback } from "../services/FeedbackServices";

const UpdateFeedbackModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    updateKnowledgebase(e.target).then(
      (result) => {
        alert(result);
        deleteFeedback(props.feedback.feedback_id).then((result) => {
          alert(result);
          props.setupdated(true);
          alert("Feedback deleted successfully");
        });
        // props.setupdated(true);
      },
      (error) => {
        alert("Failed to Update Student");
      }
    );
  };
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
              <Form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
                <Form.Group controlId="update_information">
                  <Form.Control
                    type="text"
                    name="update_information"
                    required
                    placeholder="Update Knowledgebase"
                  />
                </Form.Group>
                <Form.Group>
                  <p></p>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
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

export default UpdateFeedbackModal;
