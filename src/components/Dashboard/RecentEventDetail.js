import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import EventDetail from "../Events/EventDetail";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "200px",
    height: "200px",
    margin: "auto",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const RecentEvents = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const recentEvents = props.events.filter(
    (event) =>
      props.profile.attend
        .map((el) => event.id === el)
        .reduce((a, b) => a + b, 0) &&
      new Date(event.end_datetime).getTime() > new Date().getTime()
  );
  recentEvents.sort(
    (a, b) =>
      new Date(a.start_datetime).getTime() -
      new Date(b.start_datetime).getTime()
  );
  const recentEvent = recentEvents[props.showId];

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={6} align="center">
        <Grid item xs={12}>
          <Typography variant="h5">{t("直近のイベント詳細")}</Typography>
        </Grid>
        <Grid item xs={12}>
          {recentEvent ? (
            <EventDetail
              event={recentEvent}
              generalTags={props.generalTags}
              organizationTags={props.organizationTags}
              characterTags={props.characterTags}
              dashboard
            />
          ) : (
            <Typography>{t("参加イベントがありません。")}</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecentEvents;
