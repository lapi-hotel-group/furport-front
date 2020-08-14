import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
    backgroundColor: theme.palette.background.main,
  },
}));

const RecentEvents = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  let restDay;
  if (props.events.length) {
    restDay =
      (new Date(props.events[0].start_datetime).setHours(0, 0, 0, 0) -
        new Date().setHours(0, 0, 0, 0)) /
      (1000 * 3600 * 24);
  } else {
    return null;
  }
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={6} align="center">
        <Grid item xs={12}>
          <Typography variant="h6">
            {restDay > 0
              ? t("次のイベントまで残り {{restDay}} 日", { restDay: restDay })
              : t("イベント当日です！")}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RecentEvents;
