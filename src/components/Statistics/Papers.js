import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function Papers(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const eventsPerYear = props.attends.filter((el) =>
    props.events
      .map(
        (event) =>
          event.id === el &&
          new Date(event.start_datetime).getFullYear() ===
            new Date().getFullYear()
      )
      .reduce((a, b) => a + b)
  ).length;

  const mostOldEvent = props.attends
    .map((el) => props.events.find((event) => event.id === el))
    .reduce((a, b) =>
      new Date(a.start_datetime).getTime() <
      new Date(b.start_datetime).getTime()
        ? a
        : b
    );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <Typography variant="h5" align="center">
            {t("累計")}
          </Typography>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item sm={6}>
                <Typography variant="h7">{t("参加イベント数")}</Typography>
                <Typography variant="h5">{props.attends.length}</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="h7">{t("参加イベント数 / 週")}</Typography>
                <Typography variant="h5">
                  {(
                    (props.attends.length /
                      (new Date().getTime() -
                        new Date(mostOldEvent.start_datetime).getTime())) *
                    1000 *
                    3600 *
                    24 *
                    7
                  ).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5" align="center">
            {t("今年")}
          </Typography>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item sm={6}>
                <Typography variant="h7">{t("参加イベント数")}</Typography>
                <Typography variant="h5">{eventsPerYear}</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="h7">{t("参加イベント数 / 週")}</Typography>
                <Typography variant="h5">
                  {(
                    eventsPerYear /
                    ((new Date().getTime() -
                      new Date(new Date().getFullYear(), 0).getTime()) /
                      1000 /
                      3600 /
                      24 /
                      7)
                  ).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
