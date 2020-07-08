import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: null,
  userName: null,
  userId: null,
  setToken: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const handleSetToken = (newToken, newUserName, newUserId) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", newUserName);
    localStorage.setItem("userId", newUserId);
    setToken(newToken);
    setUserName(newUserName);
    setUserId(newUserId);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setToken(null);
    setUserName(null);
    setUserId(null);
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        userName: userName,
        userId: userId,
        setToken: handleSetToken,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
