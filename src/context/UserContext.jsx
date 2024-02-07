/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("loggedUser")) || null;

  const [loggedUser, setLoggedUser] = useState(storedUser);

  useEffect(() => {
    // Update local storage whenever loggedUser changes
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
  }, [loggedUser]);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};
