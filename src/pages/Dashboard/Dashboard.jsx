/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {
  const [userData, setUserData] = useState();
  const [deleteNO, setDeleteNO] = useState(0);
  const { loggedUser } = useUser();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setModalOpen(true);
  };
  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(loggedUser.id);
    const datauser = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/url/analytics/user/${loggedUser.id}`,
          { timeout: 10000 }
        );
        setUserData(data?.result);
      } catch (error) {
        console.log(error);
      }
    };
    datauser();
  }, [modalOpen, deleteNO]);

  return (
    <div>
      <Navbar showText={"shortURL"} />
      <div className="table-wrapper">
        <table>
          <thead>
            <tr className="th-list">
              <th>Serial No.</th>
              <th>Original URL</th>
              <th>Shortened URL</th>

              <th className="center">Clicks</th>
              <th className="act">Actions</th>
            </tr>
          </thead>

          <tbody>
            {userData?.map((item, index) => (
              <tr key={index}>
                <td className="center1">{index + 1}</td>
                <td>
                  <a href={item.redirectURL} target="_blank" type="url">
                    {item.redirectURL}
                  </a>
                </td>
                <td>
                  <a
                    href={`http://localhost:8001/${item.shortId}`}
                    target="_blank"
                  >
                    {`http://localhost:8001/${item.shortId}`}
                  </a>
                </td>
                <td className="center2">{item.visitHistory.length}</td>
                <td>
                  <div className="actions">
                    <div
                      className="edit"
                      onClick={() => {
                        handleEditRow(item.shortId);
                      }}
                    >
                      <EditIcon />
                    </div>

                    <div
                      className="delete"
                      onClick={async () => {
                        try {
                          const response = await axios.post(
                            `http://localhost:8001/url/delete`,
                            { shortId: item.shortId }
                          );
                          setDeleteNO((prev) => prev + 1);
                          console.log(response.data.message);
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </div>

                    <div
                      className="analytics"
                      onClick={() => navigate(`/analytics/${item.shortId}`)}
                    >
                      <TrendingUpIcon />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modalOpen && (
          <Modal
            shortId={rowToEdit}
            setModalOpen={setModalOpen}
            // closeModal={() => {
            //   setModalOpen(false);
            //   setRowToEdit(null);
            // }}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
