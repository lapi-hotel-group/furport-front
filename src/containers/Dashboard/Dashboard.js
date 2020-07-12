import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { AuthContext } from "../../auth/authContext";
import RecentEvents from "../../components/Dashboard/RecentEvents";
import RecentEventDetail from "../../components/Dashboard/RecentEventDetail";

const Dashboard = (props) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [events, setEvents] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showId, setShowId] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/events/";
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data.results);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, []);

  useEffect(() => {
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .get(url)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [authContext.userId]);

  return (
    <>
      <h1>{t("ダッシュボード")}</h1>
      {!events || !profile ? (
        error ? (
          <Typography>{error}</Typography>
        ) : (
          <LinearProgress />
        )
      ) : (
        <Grid container spacing={6} align="center">
          <Grid item xs={12} lg={6}>
            <RecentEventDetail
              showId={showId}
              events={events}
              profile={profile}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RecentEvents
              setShowId={setShowId}
              events={events}
              profile={profile}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
