import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

import AttendCountAreaChart from "../../components/Statistics/AttendCountAreaChart";
import AttendCountBarChart from "../../components/Statistics/AttendCountBarChart";
import AttendeesBarChart from "../../components/Statistics/AttendeesBarChart";
import ScatterChart from "../../components/Statistics/ScatterChart";
import AreaPieChart from "../../components/Statistics/AreaPieChart";
import Papers from "../../components/Statistics/Papers";
import { AuthContext } from "../../auth/authContext";
import { Typography } from "@material-ui/core";

const Statistics = () => {
  const { t } = useTranslation();
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const url = "/events/";
    const params = new URLSearchParams({
      my_attend: true,
    });
    axios
      .get(url + "?" + params.toString(), {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setEvents(response.data.results);
        setLoadingEvents(false);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
        setLoadingEvents(false);
      });
  }, [authContext.token, authContext.userId]);

  return (
    <>
      <h1>{t("統計")}</h1>
      {loadingEvents || error ? (
        <>{error ? <Typography>{error}</Typography> : <LinearProgress />}</>
      ) : !events.length ? (
        <Typography align="center">
          {t("参加イベントがありません。")}
        </Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Papers events={events} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              {t("参加イベント数 / 年")}
            </Typography>
            <AttendCountAreaChart events={events} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              {t("参加イベント数 / 月")}
            </Typography>
            <AttendCountBarChart events={events} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" align="center">
              {t("開催日時と参加者数による分類")}
            </Typography>
            <ScatterChart events={events} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6" align="center">
              {t("規模別参加イベント数")}
            </Typography>
            <AttendeesBarChart events={events} />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Typography variant="h6" align="center">
              {t("参加イベント地域：国")}
            </Typography>
            <AreaPieChart variant="country" events={events} />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Typography variant="h6" align="center">
              {t("参加イベント地域：都道府県・州")}
            </Typography>
            <AreaPieChart variant="state" events={events} />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Typography variant="h6" align="center">
              {t("参加イベント公開度")}
            </Typography>
            <AreaPieChart variant="openness" events={events} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Statistics;
