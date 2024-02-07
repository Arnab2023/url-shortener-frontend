import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import axios from "axios";
import toast, { Toaster, useToaster } from "react-hot-toast";

const Modal = ({ shortId, setModalOpen }) => {
  const [newURL, setNewURL] = useState("");
  const toaster = useToaster();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModalOpen]);

  const isValidUrl = (originalURL) => {
    try {
      const url = new URL(originalURL);
      if (url.protocol === "https" || url.protocol === "http") {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidUrl(newURL)) {
      toast.error("Invalid URL", {
        style: { fontFamily: "Poppins" },
      });
    } else {
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
    }
  };

  return (
    <div className="modal-container">
      <div className="modal" ref={modalRef}>
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
          <Toaster />
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
