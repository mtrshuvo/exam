import './App.css';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import {BrowserRouter as Router} from "react-router-dom"
import Main from "./Components/Main"
import File from './Components/File/File';

function App() {
  return (
    <Router>
      <Main />
      {/* <File /> */}
    </Router>
  );
}

export default App;
