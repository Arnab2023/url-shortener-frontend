/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    if (confirm === password) {
      try {
        const response = await axios.post(
          "http://localhost:8001/user/register",
          { name, email, password }
        );
        navigate("/login");
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Passwords didn't match");
    }
  };
  return (
    <Form
      name={name}
      setName={setName}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
      confirm={confirm}
      setConfirm={setConfirm}
      email={email}
      setEmail={setEmail}
    />
  );
};

const Form = ({
  name,
  setName,
  password,
  setPassword,
  confirm,
  setConfirm,
  email,
  setEmail,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-body">
      <div className="auth-container">
        <form onSubmit={onSubmit}>
          <h2 className="heading">REGISTER</h2>
          <div className="form-group">
            <label htmlFor="name" className="reg-text">
              Name
            </label>
            <input
              className="reginp"
              type="text"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="cnf-password" className="reg-text">
              Confirm Password
            </label>
            <input
              className="reginp"
              type="password"
              id="cnf-password"
              value={confirm}
              onChange={(event) => {
                setConfirm(event.target.value);
              }}
              required
            />
          </div>
          <button type="submit" className="regbtn">
            REGISTER
          </button>
        </form>
        <p>
          {" "}
          Already Registered?<Link to="/login"> Log in</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
