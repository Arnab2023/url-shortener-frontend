import React, { useState } from "react";
import "./style.css";
import axios from "axios";
const Modal = ({ shortId, setModalOpen }) => {
  const [newURL, setNewURL] = useState("");

  const handleSubmit = async () => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "https://url-shortener-backend-zeta.vercel.app/url/edit",
        {
          shortId: shortId,
          newUrl: newURL,
        }
      );
      setModalOpen(false);
      console.log(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <form>
          <div className="form-grp">
            <label htmlFor="newurl">New URL</label>
            <input
              name="newurl"
              onChange={(e) => {
                setNewURL(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
