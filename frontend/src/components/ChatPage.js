import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInterface from "./ChatInterface";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

function ChatPage() {
  return (
    <div>
      {/* Navigating to user providing feedback form */}
      {/* <Button variant="primary" onClick={handleShow}>
        Toggle static offcanvas
      </Button> */}

      {/* Main chat component */}
      <ChatInterface />
    </div>
  );
}

export default ChatPage;
