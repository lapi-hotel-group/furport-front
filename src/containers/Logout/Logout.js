import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../../auth/authContext";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const authData = {
      token: authContext.token,
    };
    const url = "/rest-auth/logout/";
    axios
      .post(url, authData)
      .then(() => {
        authContext.logout();
      })
      .catch((err) => {
        setError(err.response.data);
      });
  });

  return (
    <>
      {authContext.token === null ? <Redirect to="/" /> : null}
      {error !== null ? error : <CircularProgress />}
    </>
  );
};

export default Logout;
