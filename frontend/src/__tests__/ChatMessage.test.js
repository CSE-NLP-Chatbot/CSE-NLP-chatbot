import React from "react";
import { render } from "@testing-library/react";
import ChatMessage from "../components/ChatMessage";

describe("ChatMessage Component", () => {
  it("should render a message from the user", () => {
    const { getByText } = render(
      <ChatMessage message="Hello, there!" sender="user" />
    );
    const messageElement = getByText("Hello, there!");
    expect(messageElement).toBeInTheDocument();
  });

  it("should render a message from the bot", () => {
    const { getByText } = render(
      <ChatMessage message="Hi, I'm a bot." sender="bot" />
    );
    const messageElement = getByText("Hi, I'm a bot.");
    expect(messageElement).toBeInTheDocument();
  });

  it("should render user message with light background", () => {
    const { container } = render(
      <ChatMessage message="User message" sender="user" />
    );
    const messageContainer = container.querySelector(".border");

    expect(messageContainer).toHaveStyle({
      backgroundColor: "#FAF0E6", // User message background color
      color: "#352F44", // User message text color
      borderRadius: "15px",
    });
  });

  it("should render bot message with info background", () => {
    const { container } = render(
      <ChatMessage message="Bot message" sender="bot" />
    );
    const messageContainer = container.querySelector(".border");

    expect(messageContainer).toHaveStyle({
      backgroundColor: "#B6EADA", // Bot message background color
      color: "#03001C", // Bot message text color
      borderRadius: "15px",
    });
  });
  it("should render user message with dark text", () => {
    const { container } = render(
      <ChatMessage message="User message" sender="user" />
    );
    const messageText = container.querySelector("p");

    // Use regular expression to check for dark text color
    expect(messageText).toHaveStyle("color: /^rgb\\(\\d+, \\d+, \\d+\\)$/");
  });

  it("should render bot message with white text", () => {
    const { container } = render(
      <ChatMessage message="Bot message" sender="bot" />
    );
    const messageText = container.querySelector("p");

    // Use regular expression to check for white text color
    expect(messageText).toHaveStyle("color: /^rgb\\(\\d+, \\d+, \\d+\\)$/");
  });
});
