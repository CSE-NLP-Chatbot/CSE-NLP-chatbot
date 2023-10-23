import react from "react";
import { useState, useRef } from "react";
import { submit_feedback } from "../services/ChatServices";
import { Form, Button, Col, Row, Alert } from "react-bootstrap";
import "./UserFeedback.css";

function UserFeedback() {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(""); // To store the selected option
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiResponse, setApiResponse] = useState(null); // To store the API response

  const user_ID = 3;

  const handleSubmit = (e) => {
    e.preventDefault();

    const postObject = {
      feedback_type: rating,
      feedback_details: feedback,
    };

    submit_feedback(user_ID, postObject).then((data) => {
      console.log(data);
      setSubmitSuccess(true);
      setApiResponse(data); // Store the API response

      // Clear the form fields
      setFeedback("");
      setName("");
      setEmail("");
      setRating("");
    });
  };

  //   Checked code for API call
  //   const postObject = {
  //     feedback_type: rating,
  //     feedback_details: feedback,
  //   };
  //   //   // working code fro sub,it_feedback
  //   submit_feedback(user_ID, postObject).then((data) => console.log(data));

  return (
    <div className="m-1">
      <p></p>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group controlId="name" className="mt-2 mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="custom-input" // Apply custom CSS class
          />
        </Form.Group>

        <Form.Group controlId="email" className="mt-2 mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="custom-input" // Apply custom CSS class
            required
          />
        </Form.Group> */}

        <Form.Group controlId="rating" className="mt-2 mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Check
            type="radio"
            label="Accuracy"
            id="accuracy"
            name="rating"
            value="Accuracy"
            checked={rating === "Accuracy"}
            onChange={() => setRating("Accuracy")}
            className="mt-0"
          />
          <Form.Check
            type="radio"
            label="Performance"
            id="performance"
            name="rating"
            value="Performance"
            checked={rating === "Performance"}
            onChange={() => setRating("Performance")}
            required
          />
        </Form.Group>

        <Form.Group controlId="feedback" className="mt-2 mb-2">
          <Form.Label>Briefly explain your Thoughts</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter your comments here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="custom-input" // Apply custom CSS class
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="m-1">
          Submit Feedback
        </Button>
      </Form>
      {submitSuccess && apiResponse !== null && (
        // <div className="mt-3 success-message">{apiResponse}</div>
        <Alert variant="success" className="mt-2">
          <Alert.Heading>{apiResponse}</Alert.Heading>
          <p>Thank you for your valuabale feedback.</p>
          <hr />
          <p className="mb-0">
            If you want to submit futher response, kindly submit that also. Or,
            You can close the Feedback pop up.
          </p>
        </Alert>
      )}
    </div>
  );
}

export default UserFeedback;
