import "./App.css";
import "./knowledgebase.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Feedbacks from "./components/Dashboard";
import Navigation from "./components/Navigation";
import Knowledgebase from "./components/Knowledgebase";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route  path="/adminDashboard/knowledgebase" element={<Knowledgebase />} />
        <Route  path="/adminDashboard" element={<Feedbacks />} />
        <Route exact path="/" element={<Feedbacks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
