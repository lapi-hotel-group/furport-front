import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";

import AttendCountChart from "../../components/Statistics/AttendCountChart";
import AreaPieChart from "../../components/Statistics/AreaPieChart";
import Papers from "../../components/Statistics/Papers";
import { AuthContext } from "../../auth/authContext";
import { Typography } from "@material-ui/core";

const Statistics = () => {
  const { t } = useTranslation();
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [error, setError] = useState(null);
  const [attends, setAttends] = useState(null);
  const [events, setEvents] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const url = "/events/";
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data.results);
        setLoadingEvents(false);
      })
      .catch((err) => {
        setError(err.response);
        setLoadingEvents(false);
      });
  }, []);
  useEffect(() => {
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .get(url, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setAttends(response.data.attend);
        setLoadingProfiles(false);
      })
      .catch((err) => {
        setLoadingProfiles(false);
      });
  }, [authContext.token, authContext.userId]);

  return (
    <>
      <h1>{t("統計")}</h1>
      {loadingEvents || loadingProfiles || error ? null : (
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <Papers attends={attends} events={events} />
          </Grid>
          <Grid item sm={12}>
            <Typography variant="h6" align="center">
              {t("参加イベント数 / 月")}
            </Typography>
            <AttendCountChart attends={attends} events={events} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6" align="center">
              {t("参加イベント地域：国")}
            </Typography>
            <AreaPieChart variant="country" attends={attends} events={events} />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6" align="center">
              {t("参加イベント地域：都道府県・州")}
            </Typography>
            <AreaPieChart variant="state" attends={attends} events={events} />
          </Grid>
        </Grid>
      )}
      {error}
    </>
  );
};

export default Statistics;
