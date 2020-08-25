import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useTranslation } from "react-i18next";

import UserName from "../../components/Settings/UserName";
import ChangePassword from "../../components/Settings/ChangePassword";
import SocialConnections from "../../components/Settings/SocialConnections";
import { AuthContext } from "../../auth/authContext";
import { Typography } from "@material-ui/core";

const Settings = () => {
  const [error, setError] = useState(null);
  const [profiles, setProfiles] = useState(null);
  const [user, setUser] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const url = "/users/" + authContext.userId + "/";
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [authContext.token, authContext.userId]);

  useEffect(() => {
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [authContext.token, authContext.userId]);

  const { t } = useTranslation();
  return (
    <>
      <h1>{t("app:containers.settings.title")}</h1>
      {!user || !profiles || error ? (
        <>{error ? <Typography>{error}</Typography> : <LinearProgress />}</>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UserName user={user} variant="username" />
          </Grid>
          <Grid item xs={12} md={6}>
            <UserName user={user} variant="email" />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChangePassword user={user} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SocialConnections user={user} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Settings;
