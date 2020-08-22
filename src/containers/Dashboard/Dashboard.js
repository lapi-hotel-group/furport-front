import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Redirect } from "react-router-dom";

import { AuthContext } from "../../auth/authContext";
import NextEvent from "../../components/Dashboard/NextEvent";
import RecentEvents from "../../components/Dashboard/RecentEvents";
import RecentEventDetail from "../../components/Dashboard/RecentEventDetail";

import { Event } from "../../models";

const Dashboard = (props) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [events, setEvents] = useState(null);
  const [showId, setShowId] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/events/";
    const params = new URLSearchParams({
      limit: 3,
      ordering: "start_datetime",
      min_end_datetime: new Date().toISOString(),
      my_attend: true,
    });
    axios
      .get(url + "?" + params.toString(), {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then((response) => {
        const eventsData = [];
        response.data.results.forEach((event) =>
          eventsData.push(new Event().setDataByAPI(event))
        );
        setEvents(eventsData);
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
      {authContext.token === null ? <Redirect to="/" /> : null}
      <h1>{t("ダッシュボード")}</h1>
      {error ? (
        <Typography>{error}</Typography>
      ) : !events ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={6} align="center">
          <Grid item xs={12}>
            <NextEvent events={events} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RecentEventDetail showId={showId} events={events} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <RecentEvents setShowId={setShowId} events={events} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
