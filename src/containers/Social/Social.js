import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import FollowList from "../../components/Social/FollowList";
import { AuthContext } from "../../auth/authContext";

const UserProfile = (props) => {
  const [myProfile, setMyProfile] = useState(null);
  const [followProfile, setFollowProfile] = useState(null);
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    const url = "/profiles/?username=" + authContext.userName;
    axios
      .get(url)
      .then((response) => {
        setMyProfile(response.data.results[0]);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [authContext.userName]);

  useEffect(() => {
    const url = "/profiles/";
    const params = new URLSearchParams({
      my_follow: true,
    });
    axios
      .get(url + "?" + params.toString(), {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((response) => {
        setFollowProfile(response.data.results);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [authContext.token]);

  return (
    <>
      <h1>{t("app:containers.social.title")}</h1>
      {!myProfile || !followProfile ? (
        error ? (
          <Typography>{error}</Typography>
        ) : (
          <LinearProgress />
        )
      ) : (
        <Grid container spacing={6} align="center">
          <Grid item xs={12} lg={12}>
            <FollowList followProfile={followProfile} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserProfile;
