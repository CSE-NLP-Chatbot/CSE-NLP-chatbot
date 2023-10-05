import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import mic_on from "../assets/mic_on_icon.svg";
import mic_off from "../assets/mic_off_icon.svg";

const VoiceInput = ({ userInput, setUserInput }) => {
  // Pass the recognition object to the useSpeechRecognition hook
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    // Update userInput when a new transcript is received
    if (transcript !== "") {
      setUserInput((prevUserInput) => prevUserInput + ` ${transcript}`);
      resetTranscript();
    }
  }, [transcript, setUserInput]);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const [isMicrophoneActive, setIsMicrophoneActive] = useState(false);

  const toggleMicrophone = () => {
    if (!isMicrophoneActive) {
      startListening({ language: "en-US" });
    } else {
      SpeechRecognition.stopListening();
    }
    setIsMicrophoneActive(!isMicrophoneActive);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      <button onClick={toggleMicrophone}>
        {isMicrophoneActive ? (
          <img
            src={mic_off}
            alt="mic_off"
            style={{ width: "30px", height: "100%" }}
          />
        ) : (
          <img
            src={mic_on}
            alt="mic_on"
            style={{ width: "30px", height: "100%" }}
          />
        )}
      </button>
      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>{transcript}</p> */}
    </div>
  );
};

export default VoiceInput;
