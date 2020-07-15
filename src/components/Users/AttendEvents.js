import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import EventCard from "../Events/EventCard";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const AttendEvents = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={6} align="center">
          <Grid item xs={12}>
            <Typography variant="h5">{t("直近の参加イベント")}</Typography>
          </Grid>
          <Grid item xs={12}>
            {props.events.length ? (
              <EventCard
                page={1}
                sortedEvents={props.events}
                setShowId={props.setShowId}
                user
              />
            ) : (
              <Typography>{t("参加イベントがありません。")}</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default AttendEvents;
