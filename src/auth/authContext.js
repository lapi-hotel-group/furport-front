import React, { useState } from "react";

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
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [imageUrl, setImageUrl] = useState(localStorage.getItem("imageUrl"));
  const handleSetToken = (newToken, newUserName, newUserId, newImageUrl) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userName", newUserName);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("imageUrl", newImageUrl);
    setToken(newToken);
    setUserName(newUserName);
    setUserId(newUserId);
    setImageUrl(newImageUrl);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("imageUrl");
    setToken(null);
    setUserName(null);
    setUserId(null);
    setImageUrl(null);
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
