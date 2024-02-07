/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "../../components/Navbar/Navbar";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

function Analytics() {
  const { id } = useParams();

  const [aData, setAData] = useState();
  const { loggedUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `https://url-shortener-backend-zeta.vercel.app/url/analytics/${id}`
        );
        setAData(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {}, [aData]);

  const getDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const dateString = date.toLocaleDateString(); // Get date in the format MM/DD/YYYY
    const timeString = date.toLocaleTimeString(); // Get time in the format HH:MM:SS AM/PM
    return [dateString, timeString];
  };

  return (
    <div className="outer">
      <Navbar showText={"dashboard"} />

      <div className="inner">
        <div className="data-container">
          <span>
            Original URL:
            <a href={aData?.redirectURL} target="_blank">
              <div className="inp1">{aData?.redirectURL}</div>
            </a>
          </span>
          <span>
            Shortened URL:
            <a
              href={`http://url-shortener-backend-zeta.vercel.app/${aData?.shortId}`}
              target="_blank"
            >
              <div className="inp2">{`http://url-shortener-backend-zeta.vercel.app/${aData?.shortId}`}</div>
            </a>
          </span>
          <span>
            Total Clicks:
            <div className="inp3">{aData?.visitHistory.length}</div>
          </span>
        </div>
        <table>
          <thead>
            <tr>
              <th className="center3">S No. </th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {aData?.visitHistory?.map((item, index) => (
              <tr key={index}>
                <td className="center2">{index + 1}</td>
                <td>{getDateTime(item.timestamp)[0]}</td>
                <td>{getDateTime(item.timestamp)[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
