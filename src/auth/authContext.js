import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: null,
  userName: null,
  setToken: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const handleSetToken = (newToken, newUserName) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", newUserName);
    setToken(newToken);
    setUserName(newUserName);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName(null);
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        userName: userName,
        setToken: handleSetToken,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
