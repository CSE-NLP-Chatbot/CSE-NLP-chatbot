import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Stack,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Button,
} from "react-bootstrap";
import {
  get_conversation_by_user_id,
  get_conversation_title,
  real_time_chat,
} from "../services/ChatServices";
import ChatMessage from "./ChatMessage";
import uom_logo from "../assets/uom_logo.png";
import cse_logo from "../assets/cse_logo.png";
import ChatHeader from "./ChatHeader";
import VoiceInput from "./VoiceInput";

const ChatInterface = () => {
  // user ID should be hardcoded here.

  const user_id = 2;
  const userName = "hi";

  let [topics, setTopics] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    get_conversation_title(user_id).then((data) => {
      setTopics(data);
    });
    get_conversation_by_user_id(user_id).then((data) => {
      setMessages(data);
    });
  }, []);

  const [currentTopic, setCurrentTopic] = useState(
    topics.length > 0 ? topics[0].conversation_title : []
  );
  const [userInput, setUserInput] = useState("");
  const [userTopicInput, setUserTopicInput] = useState("");
  const [answerFromBot, setAnswerFromBot] = useState("");
  const [convertMessage, setConvertMessage] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [currentTopic, userInput]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  const handleTopicChange = (topic) => {
    setCurrentTopic(topic);
  };

  // convert messages into useful format inorder to display on chat body.
  if (Object.keys(convertMessage).length === 0 && messages.length > 0) {
    messages.forEach((item) => {
      const { conversation_title, question, answer, user } = item;

      if (!convertMessage[conversation_title]) {
        convertMessage[conversation_title] = [];
      }

      if (question) {
        convertMessage[conversation_title].push({
          message: question,
          sender: "user",
        });
      }

      if (answer) {
        convertMessage[conversation_title].push({
          message: answer,
          sender: "bot",
        });
      }
    });
  }

  // // Define a function to handle sending the message to the backend
  // const handleSendMessage = () => {
  //   if (userInput.trim() !== "") {
  //     // Send the message to the backend here
  //     let postObject = {
  //       conversation_title: currentTopic,
  //       question: userInput,
  //     };
  //     real_time_chat(user_id, postObject).then((data) => {
  //       setAnswerFromBot(data);
  //     });

  //     // Clear the user input
  //     setUserInput("");
  //   }
  // };

  // // Attach an event listener to listen for Enter key press
  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     event.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
  //     handleSendMessage(); // Call the function to send the message
  //   }
  // };

  // handle user send a message to bot.
  const handleUserInputSubmit = (event) => {
    event.preventDefault();

    // Create a new message object
    const userMessage = { message: userInput, sender: "user" };

    // Send the message to the backend here
    let postObject = { conversation_title: currentTopic, question: userInput };
    real_time_chat(user_id, postObject).then((data) => {
      // setAnswerFromBot(data);

      // Create a new message object for the bot.
      // moving all logics into real_time_chat function, make sure that each the post api call.
      const botMessage = { message: data, sender: "bot" };

      // Update the convertMessage state for the current topic
      // Check if the current topic already exists in convertMessage
      if (!convertMessage[currentTopic]) {
        // If it doesn't exist, create a new entry for the current topic
        setConvertMessage((prevConvertMessage) => ({
          ...prevConvertMessage,
          [currentTopic]: [userMessage, botMessage], // Add user's message and bot's response
        }));
      } else {
        // If it exists, update the existing topic entry
        setConvertMessage((prevConvertMessage) => ({
          ...prevConvertMessage,
          [currentTopic]: [
            ...prevConvertMessage[currentTopic],
            userMessage, // Adding user's message
            botMessage, // Adding bot's response
          ],
        }));
      }

      // Clear the user input and bot answer
      setUserInput("");
      setAnswerFromBot("");
    });
  };

  // handle user add a new topic to the chat.
  const handleUserInputTopicSubmit = (event) => {
    event.preventDefault();

    // Check if the topic already exists
    if (
      !topics.some((topic) => topic.conversation_title === userTopicInput)
      // &&
      // !topics.some((topic) => topic.conversation_title === currentTopic)
    ) {
      // Create a new topic object
      const newTopic = { conversation_title: userTopicInput };

      // Update the topics state
      setTopics((prevTopics) => [newTopic, ...prevTopics]);

      // Set the current topic to the new topic
      setCurrentTopic(userTopicInput);

      // Create an initial message for the new topic
      const initialMessage = { message: "Welcome to Chatbot", sender: "bot" };

      // Update the convertMessage state to include the new topic and initial message
      setConvertMessage((prevConvertMessage) => ({
        ...prevConvertMessage,
        [userTopicInput]: [initialMessage],
      }));
    }

    // Clear the userTopicInput
    setUserTopicInput("");
    setAnswerFromBot("");
  };

  return (
    <Container fluid className="py-1" style={{ height: "100vh" }}>
      <Row className="d-flex justify-content-center" style={{ height: "100%" }}>
        <Col md="10" lg="11" xl="12">
          <Card id="chat1" style={{ borderRadius: "15px", height: "100%" }}>
            <Card.Header
              // className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              // className="border-bottom-0 align-items-center justify-content-between flex-row"
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
            >
              <ChatHeader />
            </Card.Header>

            <Card.Body>
              <Row style={{ height: "100%" }}>
                <Col md="4" lg="4" xl="4" sm="4">
                  <div className="flex">
                    <Row className="mb-3">
                      <Stack direction="horizontal" gap={3}>
                        <Form.Control
                          className="me-auto"
                          type="text"
                          placeholder="Enter Title of the Chat"
                          value={userTopicInput}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
                              handleUserInputTopicSubmit(e);
                            }
                          }}
                          onChange={(e) => setUserTopicInput(e.target.value)}
                        />
                        <Button
                          variant="primary"
                          onClick={handleUserInputTopicSubmit}
                          style={{ height: "40px", maxWidth: "60px" }}
                        >
                          Add
                        </Button>
                      </Stack>
                    </Row>
                    <ListGroup variant="flush">
                      {topics.length >= 0 ? (
                        topics.map((topic) => (
                          <ListGroup.Item
                            key={topic.conversation_title}
                            action
                            active={topic.conversation_title === currentTopic}
                            onClick={() =>
                              handleTopicChange(topic.conversation_title)
                            }
                          >
                            {topic.conversation_title}
                          </ListGroup.Item>
                        ))
                      ) : (
                        <div> loading your chat titles </div>
                      )}
                    </ListGroup>
                  </div>
                  <div style={{ height: "10px" }}></div>
                </Col>
                <Col
                  md="8"
                  lg="8"
                  xl="8"
                  sm="8"
                  style={{ position: "relative" }}
                >
                  <div
                    className="chat-messages scrollbar"
                    style={{ overflowY: "scroll", maxHeight: "75vh" }}
                  >
                    {convertMessage[currentTopic] ? (
                      convertMessage[currentTopic].map((message, index) => (
                        <ChatMessage
                          key={index}
                          message={message.message}
                          sender={message.sender}
                        />
                      ))
                    ) : (
                      <>
                        <div
                          style={{ height: "20px", marginBottom: "5px" }}
                        ></div>
                        <div className="d-flex justify-content-center align-items-center">
                          <div>Start new Conversation</div>
                        </div>
                      </>
                    )}
                    <div ref={messagesEndRef}></div>
                  </div>
                  <div style={{ height: "40px" }}></div>
                  <div
                    className="input-section"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <Stack direction="horizontal" gap={3}>
                      <Form.Control
                        className="me-auto"
                        type="text"
                        placeholder="Type your message"
                        value={userInput}
                        // onKeyDown={handleKeyDown} // Attach the event listener here
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // Prevent the default behavior of Enter (e.g., form submission)
                            handleUserInputSubmit(e);
                          }
                        }}
                        onChange={(e) => setUserInput(e.target.value)}
                      />
                      <Button
                        variant="primary"
                        onClick={handleUserInputSubmit}
                        style={{ height: "40px", maxWidth: "100px" }}
                      >
                        Submit
                      </Button>
                      <VoiceInput setUserInput={setUserInput} />
                    </Stack>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatInterface;
