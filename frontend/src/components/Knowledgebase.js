import React, { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Row, Col, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Button, ButtonToolbar } from "react-bootstrap";
import {
  getKnowledgebaseInfo,
  deleteKnowledgebaseInfo,
} from "../services/UpdateKnowledgebaseServices";

const Knowledgebase = () => {
  const [info, setInfo] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (info.length && !isUpdated) {
      return;
    }
    getKnowledgebaseInfo().then((data) => {
      if (mounted) {
        setInfo(data);
      }
    });
    return () => {
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, info]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // You can implement the saving logic here.
    // For simplicity, we will just log the content to the console.
    const blob = new Blob([content], { type: "text/plain" });
    const formData = new FormData();
    formData.append("file", blob, fileName);

    // Replace 'your-server-endpoint' with the actual backend API endpoint
    fetch("http://127.0.0.1:8000/savefile/", {
      method: "POST", // You can use 'PUT' or 'PATCH' depending on your API
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          setIsSaved(true); // Mark the changes as saved
          // You can display a success message to the user here
        } else {
          // Handle errors, display an error message, etc.
          console.error("Failed to save data to the server");
        }
      })
      .catch((error) => {
        console.error("Error while saving data:", error);
      });
    console.log(content);
    setIsEditing(false);
  };

  const handleDelete = (e, update_id) => {
    e.preventDefault();
    deleteKnowledgebaseInfo(update_id).then((result) => {
      alert(result);
      setIsUpdated(true);
    });
  };

  console.log(info);
  return (
    <div className="body_div">
      <Row className="flex-wrap">
        {info.length!==0&&<Col sm={4}>
          <div className="cards">
            {info.map((information) => (
              <Card
                className="container-fluid  bg-dark text-white  mb-3"
                key={information.update_id}
                border="primary"
                style={{
                  width: "18rem",
                  marginBottom: "20px",
                  marginLeft: "20px",
                }}
              >
                {/* <Card.Header>{information.update_status}</Card.Header> */}
                <Card.Body className="card-body">
                  {/* <Card.Title></Card.Title> */}
                  <Card.Text>{information.update_information}</Card.Text>
                  <div class="d-flex justify-content-between align-items-center">
                    <Button
                      variant="warning"
                      onClick={(event) =>
                        handleDelete(event, information.update_id)
                      }
                    >
                      Solve
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>}
        <Col sm={8}>
          <Container className=" container-fluid form_create">
            <Row className="mt-4">
              <Col>
                <Form.Group>
                  <Form.Label className="label">Load File</Form.Label>
                  <Form.Control
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                {fileName && <p className="label">Loaded file: {fileName}</p>}
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  className="editB"
                  variant="primary"
                  onClick={handleEdit}
                  disabled={!fileName}
                >
                  Edit
                </Button>
              </Col>
            </Row>
            {isEditing && (
              <Row className="mt-4">
                <Col>
                  <Form.Group >
                    <Form.Label className="label">Edit File</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={10}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}
            {isEditing && (
              <Row>
                <Col>
                  <Button
                    className="editB"
                    variant="success"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default Knowledgebase;
