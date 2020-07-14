import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import EventDetail from "../Events/EventDetail";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const RecentEvents = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={6} align="center">
        <Grid item xs={12}>
          <Typography variant="h5">{t("直近のイベント詳細")}</Typography>
        </Grid>
        <Grid item xs={12}>
          {props.events[props.showId] ? (
            <EventDetail event={props.events[props.showId]} dashboard />
          ) : (
            <Typography>{t("参加イベントがありません。")}</Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecentEvents;
