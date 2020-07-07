import React, { useState } from "react";

export const AuthContext = React.createContext({
  token: null,
  setToken: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  return (
    <AuthContext.Provider
      value={{
        token: token,
        setToken: handleSetToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
