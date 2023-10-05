import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Feedbacks from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Knowledgebase from "./components/Knowledgebase";
import ChatInterface from "./components/ChatInterface";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import VoiceInput from "./components/VoiceInput";
import UserFeedback from "./components/UserFeedback";

function App() {
  return (
    // router for UserFeedBack
    // <div>
    //   <UserFeedback />
    // </div>

    // Route fro Chatpage
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<ChatInterface/>} /> */}
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>

    // <BrowserRouter>
    //   <Navigation />
    //   <Routes>
    //     <Route  path="/adminDashboard/knowledgebase" element={<Knowledgebase />} />
    //     <Route  path="/adminDashboard" element={<Feedbacks />} />
    //     <Route exact path="/" element={<Feedbacks />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
