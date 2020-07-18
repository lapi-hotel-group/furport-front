import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext({
  token: null,
  userName: null,
  userId: null,
  imageUrl: null,
  setToken: () => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [expirationTime, setExpirationTime] = useState(
    localStorage.getItem("expirationTime")
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("imageUrl"));

  useEffect(() => {
    if (expirationTime !== null) {
      setTimeout(() => {
        logout();
      }, expirationTime - new Date().getTime());
    }
  }, [expirationTime]);

  const handleSetToken = (newToken, newUserName, newUserId, newImageUrl) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", newUserName);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("imageUrl", newImageUrl);
    localStorage.setItem(
      "expirationTime",
      new Date().getTime() + 24 * 3600 * 1000
    );
    setToken(newToken);
    setUserName(newUserName);
    setUserId(newUserId);
    setImageUrl(newImageUrl);
    setExpirationTime(new Date().getTime() + 24 * 3600 * 1000);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("expirationTime");
    setToken(null);
    setUserName(null);
    setUserId(null);
    setImageUrl(null);
    setExpirationTime(null);
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        userName: userName,
        userId: userId,
        imageUrl: imageUrl,
        setToken: handleSetToken,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
