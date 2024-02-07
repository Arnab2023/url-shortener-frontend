import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/Register";
import "./App.css";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Shorturl from "./pages/Shorturl/Shorturl";
import { UserProvider } from "./context/UserContext";
import Analytics from "./pages/Analytics/Analytics";
function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Shorturl />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics/:id" element={<Analytics />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
