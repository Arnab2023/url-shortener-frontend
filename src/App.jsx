import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import "./App.css";
import { Login } from "@mui/icons-material";

function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
