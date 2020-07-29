import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AuthContext } from "../../auth/authContext";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";

const Logout = () => {
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const authData = {
      token: authContext.token,
    };
    const url = "/dj-rest-auth/logout/";
    axios
      .post(url, authData)
      .then(() => {
        authContext.logout();
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  });

  return (
    <>
      {authContext.token === null ? <Redirect to="/" /> : null}
      {error ? <Typography>{error}</Typography> : <CircularProgress />}
    </>
  );
};

export default Logout;
