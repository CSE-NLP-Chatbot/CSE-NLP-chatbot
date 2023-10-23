// //VoiceInput.test.js
// const React = require(React);
// const render = require(testing - library / React);
// const fireEvent = require(testing - library / React);
// const waitFor = require(testing - library / React);
// const axios = require(axios);
// const VoiceInput = require("../components/VoiceInput");

import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  getByTestId,
} from "@testing-library/react";
import axios from "axios";
import VoiceInput from "../components/VoiceInput";
import { act } from "react-dom/test-utils";

// // Import the mocked react-speech-recognition
// jest.mock("react-speech-recognition");

// Import the mocked react-speech-recognition
jest.mock("react-speech-recognition", () => {
  const useSpeechRecognition = jest.fn().mockReturnValue({
    transcript: "",
    listening: false,
    browserSupportsSpeechRecognition: true,
  });

  const SpeechRecognition = {
    startListening: jest.fn(),
    abortListening: jest.fn(),
  };

  return { useSpeechRecognition, SpeechRecognition };
});

// // Mock axios.get to avoid making actual network requests
// jest.mock("axios");

jest.mock("axios", () => {
  const axios = {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          token:
            "eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAi.k0NzJlYjEzNGE5Mzg4MWQ2NVyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy8wZGU3ZGQ3OS1lNjIxLTQ2MmEtODgwNy0wNjg3YzkxZTU2YWIvcmVzb3VyY2VHcm91cHMvTkxQLUNoYXRib3QvcHJvdmlkZXJzL01pY3Jvc29mdC5Db2duaXRpdmVTZXJ2aWNlcy9hY2NvdW50cy9Wb2ljZVJlY2c.iGbSfbZj0b6voyj_nP3hJW1T3QUez-xqcQo74tlAwgkrpS1LFA0p",
        },
      })
    ), // Mock the axios.get method
    // You can add other axios methods and their mock implementations here if needed.
  };
  return axios;
});

describe("VoiceInput Component", () => {
  // Mock the response for axios.get
  axios.get.mockResolvedValue({ data: { token: "mocked-token" } });

  it("renders the component", async () => {
    await act(async () => {
      const { getByTestId } = render(<VoiceInput setUserInput={() => {}} />);
      await waitFor(() => {
        expect(getByTestId("mic_on")).toBeInTheDocument();
      });
    });
  });

  // it("initializes with the microphone off", () => {
  //   const { getByAltText } = render(<VoiceInput setUserInput={setUserInput} />);
  //   const micOnIcon = getByAltText("mic_on");
  //   expect(micOnIcon).toBeInTheDocument();
  // });

  // it("toggles the microphone icon on button click", async () => {
  //   const { getByAltText } = render(<VoiceInput setUserInput={setUserInput} />);
  //   const micOnIcon = getByAltText("mic_on");
  //   const button = micOnIcon.parentElement;

  //   // Click the button to toggle the microphone
  //   fireEvent.click(button);

  //   // Wait for the component to re-render after state change
  //   await waitFor(() => {
  //     const micOffIcon = getByAltText("mic_off");
  //     expect(micOffIcon).toBeInTheDocument();
  //   });

  //   // Click the button again to toggle it back
  //   fireEvent.click(button);

  //   await waitFor(() => {
  //     expect(micOnIcon).toBeInTheDocument();
  //   });
  // });

  // it("fetches Azure token and applies the polyfill", async () => {
  //   render(<VoiceInput setUserInput={setUserInput} />);

  //   // Wait for the token to be fetched
  //   await waitFor(() => {
  //     expect(axios.get).toHaveBeenCalledWith("/geraente_azure_token/");
  //   });

  //   // Ensure that the polyfill is applied (mocked in this example)
  //   expect(window.SpeechRecognition).toBeDefined();
  // });
});
