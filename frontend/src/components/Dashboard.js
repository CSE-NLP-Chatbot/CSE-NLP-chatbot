import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { Row, Col } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import ViewFeedbackModal from "./ViewFeedbackModal";
import UpdateFeedbackModal from "./UpdateFeedbackModal";
import "../dashboard.css";
import {
  getfeedbacks,
  get_feedbacks_by_feedback_type,
  deleteFeedback,
} from "../services/FeedbackServices";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [viewFeedback, setViewFeedback] = useState([]);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [UpdateFeedback, setUpdateFeedback] = useState([]);
  const [UpdateModalShow, setUpdateModalShow] = useState(false);
  const [feedbackType, setFeedbackType] = useState("All");
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    let mounted = true;
    if (feedbacks.length && !isUpdated) {
      return;
    }
    getfeedbacks().then((data) => {
      if (mounted) {
        if (data.status === false) {
          setError(data.message);
        } else {
          setFeedbacks(data);
        }
      }
    }).catch((error) => {
      setError("An error occurred while fetching feedbacks.");
    });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, feedbacks]);

  const handleView = (e, feedback) => {
    e.preventDefault();
    setViewModalShow(true);
    setViewFeedback(feedback);
  };

  const handleUpdate = (e, feedback) => {
    e.preventDefault();
    setUpdateModalShow(true);
    setUpdateFeedback(feedback);
  };

  const handleDelete = (e, feedback_id) => {
    if (window.confirm("Are you sure ?")) {
      e.preventDefault();
      deleteFeedback(feedback_id).then((result) => {
        setIsUpdated(true);
        alert("Feedback deleted successfully");
        if (feedbackType === "All") {
          getfeedbacks().then((data) => {
            setFeedbacks(data);
          });
        } else {
          get_feedbacks_by_feedback_type(feedbackType).then((data) => {
            setFeedbacks(data);
          });
        }
      });
    }
  };

  const handleFilter = (e, value) => {
    e.preventDefault();
    setFeedbackType(value);
    get_feedbacks_by_feedback_type(value).then((data) => {
      setFeedbacks(data);
    });
  };
  const handleAll = (e) => {
    e.preventDefault();
    setFeedbackType("All");
    getfeedbacks().then((data) => {
      setFeedbacks(data);
    });
  };
  let ViewFeedbackModalClose = () => setViewModalShow(false);
  let UpdateFeedbackModalClose = () => setUpdateModalShow(false);
  return (
    <div className="body_div container-fluid side-container ">
      <div className="row side-row">
        {/* {error ? ( <div className="error-message">
            <h1 style={{ color: "white" }}>Unauthorized Access</h1>
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        ) : ( */}
         {feedbacks.length === 0 ? (
          <h2 className="text-center" style={{ color: "white" }}>
            No feedbacks
          </h2>
        ) : (
          <div>
            <Row>
              <Col>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="danger"
                    style={{ marginLeft: "5px" }}
                    onClick={(event) => handleAll(event, "All")}
                  >
                    All
                  </Button>

                  <Button
                    className="mr-2 "
                    variant="danger"
                    style={{ marginLeft: "5px" }}
                    onClick={(event) => handleFilter(event, "Accuracy")}
                  >
                    Accuracy
                  </Button>

                  <Button
                    className="mr-2"
                    variant="danger"
                    style={{ marginLeft: "5px" }}
                    onClick={(event) => handleFilter(event, "Performance")}
                  >
                    Performance
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
            <p id="before-table"></p>
            <Table
              striped
              bordered
              hover
              className="react-bootstrap-table"
              id="dataTable"
            >
              <thead>
                <tr>
                  <th>Infromation</th>
                  <th>Feedback Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr
                    key={feedback.feedback_id}
                  >
                    <td>{feedback.feedback_details}</td>
                    <td>{feedback.feedback_type}</td>
                    <td>
                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={(event) =>
                          handleDelete(event, feedback.feedback_id)
                        }
                      >
                        <RiDeleteBin5Line />
                      </Button>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      {feedback.feedback_type === "Accuracy" && (
                        <React.Fragment>
                          <Button
                            className="mr-2"
                            onClick={(event) => handleUpdate(event, feedback)}
                          >
                            <FaEdit />
                          </Button>
                          <UpdateFeedbackModal
                            show={UpdateModalShow}
                            feedback={UpdateFeedback}
                            onHide={UpdateFeedbackModalClose}
                            setupdated={setIsUpdated}
                          ></UpdateFeedbackModal>
                        </React.Fragment>
                      )}
                      {feedback.feedback_type === "Performance" && (
                        <React.Fragment>
                          <Button
                            className="mr-2"
                            variant="info"
                            onClick={(event) => handleView(event, feedback)}
                          >
                            <FiBookOpen />
                          </Button>
                          <ViewFeedbackModal
                            show={viewModalShow}
                            feedback={viewFeedback}
                            onHide={ViewFeedbackModalClose}
                          ></ViewFeedbackModal>
                        </React.Fragment>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) }
      </div>
    </div>
  );
};
export default Feedbacks;