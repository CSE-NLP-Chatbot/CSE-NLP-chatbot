import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { Row, Col } from "react-bootstrap";
import { Button, ButtonToolbar } from "react-bootstrap";
import { RiDeleteBin5Line } from "react-icons/ri";
import ViewFeedbackModal from "./ViewFeedbackModal";
import {
  getfeedbacks,
  get_feedbacks_by_feedback_type,
  deleteStudent,
} from "../services/FeedbackServices";
import "../App.css";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [viewFeedback, setViewFeedback] = useState([]);
  const [viewModalShow, setViewModalShow] = useState(false);
  const [feedbackType, setFeedbackType] = useState("All");
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (feedbacks.length && !isUpdated) {
        return;
      }
    getfeedbacks().then((data) => {
      if (mounted) {
        setFeedbacks(data);
      }
    });
    return () => {(mounted = false);
    setIsUpdated(false);};
  }, [isUpdated, feedbacks]);

  const handleView = (e, feedback) => {
    e.preventDefault();
    setViewModalShow(true);
    setViewFeedback(feedback);
  };

  const handleDelete = (e, feedback_id) => {
    if (window.confirm("Are you sure ?")) {
      e.preventDefault();
      deleteStudent(feedback_id).then(
        (result) => {
          alert(result);
          setIsUpdated(true);
          alert("Feedback deleted successfully");
          if (feedbackType == "All"){
            getfeedbacks().then((data) => {
                setFeedbacks(data);
                }
            );
          }else{
            get_feedbacks_by_feedback_type(feedbackType).then((data) => {
                setFeedbacks(data);
          })
        }
        })
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
  return (
    <div className="container-fluid side-container">
      <div className="row side-row">
        {feedbacks.length === 0 ? (
          <h2 className="text-center">No feedbacks</h2>
        ) : (
          <div>
            <Row>
              <Col>
                <ButtonToolbar>
                  <Button
                    className="mr-2"
                    variant="danger"
                    onClick={(event) => handleAll(event, "All")}
                  >
                    All
                  </Button>

                  <Button
                    className="mr-2 "
                    variant="danger" style={{marginLeft:"5px"}}
                    onClick={(event) => handleFilter(event, "Accuracy")}
                  >
                    Accuracy
                  </Button>

                  <Button
                    className="mr-2"
                    variant="danger"  style={{marginLeft:"5px"}}
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
                <th>I</th>  
                  <th>Infromation</th>
                  <th>Feedback Type</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback) => (
                  <tr key={feedback.feedback_id}>
                     <td>{feedback.feedback_id}</td>
                    <td>{feedback.feedback_details}</td>
                    <td>{feedback.feedback_type}</td>
                    <td>
                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={(event) => handleDelete(event, feedback.feedback_id)}
                      >
                        <RiDeleteBin5Line />
                      </Button>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      {feedback.feedback_type === "Accuracy" && (
                        <Button
                          className="mr-2"
                          // onClick={(event) => handleUpdate(event, stu)}
                        >
                          <FaEdit />
                        </Button>
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
        )}
      </div>
    </div>
  );
};
export default Feedbacks;
