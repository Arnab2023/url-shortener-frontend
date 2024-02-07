/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import "./style.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setLoggedUser } = useUser();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8001/user/login", {
        email,
        password,
      });
      if (data.user) {
        setLoggedUser({
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          token: data.token,
        });
        navigate("/");
      } else {
        alert("invalid email or password");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Form
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
};
const Form = ({ email, setEmail, password, setPassword, label, onSubmit }) => {
  return (
    <div className="auth-body">
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2 className="heading">LOGIN</h2>
          <div className="form-group">
            <label htmlFor="email" className="reg-text">
              Email
            </label>
            <input
              className="reginp"
              type="email"
              id="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="reg-text">
              Password
            </label>
            <input
              className="reginp"
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="regbtn">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
