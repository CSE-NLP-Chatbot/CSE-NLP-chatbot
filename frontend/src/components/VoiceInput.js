// VoiceInput.js
import React from "react";
import { useEffect, useState } from "react";
import createSpeechServicesPonyfill from "web-speech-cognitive-services";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import mic_on from "../assets/mic_on_icon.svg";
// import mic_off from "../assets/mic_off_icon.svg";
import mic_off from "../assets/sound_200.gif";

const VoiceInput = ({ userInput, setUserInput }) => {
  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);
  const [azureToken, setAzureToken] = useState("");
  const AZURE_REGION = "centralindia";

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    // Fetch the Azure Cognitive Services token from backend
    axios
      .get("http://127.0.0.1:8000/generate_azure_token/")
      .then((response) => {
        setAzureToken(response.data.token);

        const { SpeechRecognition: AzureSpeechRecognition } =
          createSpeechServicesPonyfill({
            credentials: {
              region: AZURE_REGION,
              authorizationToken: response.data.token,
            },
          });

        SpeechRecognition.applyPolyfill(AzureSpeechRecognition);
      })
      .catch((error) => {
        console.error("Error fetching Azure token:", error);
      });
  }, []);

  useEffect(() => {
    // Update userInput when a new transcript is received
    if (transcript !== "") {
      setUserInput(transcript);
    }
  }, [transcript, setUserInput]);

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });

  const toggleMicrophone = () => {
    if (!isMicrophoneActive) {
      startListening();
    } else {
      SpeechRecognition.abortListening();
    }
    setIsMicrophoneActive(!isMicrophoneActive);
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Speech recognition is not supported.</div>;
  }

  return (
    <div>
      <button onClick={toggleMicrophone}>
        {isMicrophoneActive ? (
          <img
            data-testid="mic-off"
            src={mic_off}
            alt="mic_off"
            style={{ width: "30px", height: "100%" }}
          />
        ) : (
          <img
            data-testid="mic-on"
            src={mic_on}
            alt="mic_on"
            style={{ width: "30px", height: "100%" }}
          />
        )}
      </button>
    </div>
  );
};

export default VoiceInput;
