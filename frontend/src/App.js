import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Feedbacks from './components/Dashboard';
import {BrowserRouter,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    {/* <Navigation /> */}
    <Routes>
       <Route exact path="/" element={<Feedbacks/>} />
     </Routes>
  </BrowserRouter>
  );
}

export default App;
