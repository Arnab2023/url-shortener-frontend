import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useRef } from "react";
import { useUser } from "../../context/UserContext";
import Navbar from "../../components/Navbar/Navbar";
import toast, { Toaster, useToaster } from "react-hot-toast";

const Shorturl = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [analytic, setAnalytic] = useState({});

  const inputRef = useRef(null);
  const { loggedUser } = useUser();

  const toaster = useToaster();
  const handleCheckUrl = () => {};

  const isValidUrl = (originalURL) => {
    try {
      new URL(originalURL);
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidUrl(originalURL) === false) {
      toast.error("Invalid URL", {
        style: { fontFamily: "Poppins" },
      });
    } else {
      try {
        const { data } = await axios.post(
          "https://url-shortener-backend-zeta.vercel.app/url",
          { url: originalURL, userId: loggedUser ? loggedUser.id : null },
          { timeout: 10000 }
        );
        if (data) {
          setShortURL(
            `https://url-shortener-backend-zeta.vercel.app/${data.id}`
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // useEffect(() => {
  //   console.log(shortURL);
  // }, [shortURL]);

  const copyText = async (e) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          console.log("Text copied to clipboard");
        })
        .catch((error) => {
          console.error("Error copying text:", error);
        });
    }
  };

  return (
    <div>
      <Navbar showText={"dashboard"} />
      <div className="Shorturl">
        <div className="image">
          <img
            src="https://cdn0.iconfinder.com/data/icons/very-basic-android-l-lollipop-icon-pack/24/globe-512.png"
            alt=""
          />
          <p>Welcome to URL Shortener</p>
        </div>
        <div className="input-field">
          <input
            type="text"
            value={originalURL}
            onChange={(e) => {
              setOriginalURL(e.target.value);
            }}
            placeholder="Enter your long URL here..."
          />
          <button className="btn1" onClick={handleSubmit}>
            <span className="button-text1">Submit</span>
            
          </button>
          <Toaster />
        </div>
        <div>
          {shortURL === "" ? (
            <></>
          ) : (
            <div>
              {" "}
              <div className="short-url">
                <input
                  type="copy-text"
                  value={shortURL}
                  readOnly
                  ref={inputRef}
                />
                <button className="btn2" onClick={copyText}>
                  <span className="button-text2">Copy</span>
                 
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shorturl;
