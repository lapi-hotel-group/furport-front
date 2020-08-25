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
  user: {
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Papers(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  if (!props.events.length) {
    return (
      <Typography align="center">
        {t("common:messages.no-attended-events")}
      </Typography>
    );
  }

  const eventsPerYear = props.events
    .map(
      (event) =>
        new Date(event.start_datetime).getFullYear() ===
        new Date().getFullYear()
    )
    .reduce((a, b) => a + b, 0);

  const mostOldEvent = props.events.reduce(
    (a, b) =>
      new Date(a.start_datetime).getTime() <
      new Date(b.start_datetime).getTime()
        ? a
        : b,
    0
  );

  const mostNewEvent = props.events.reduce(
    (a, b) =>
      new Date(a.end_datetime).getTime() > new Date(b.end_datetime).getTime()
        ? a
        : b,
    0
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" align="center">
            {t("glossary:words.grand-total")}
          </Typography>
          <Paper
            className={
              props.user ? classes.user + " " + classes.paper : classes.paper
            }
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {t(
                    "app:components.statistics.captions.number-of-events-attended"
                  )}
                </Typography>
                <Typography variant="h5">{props.events.length}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {t(
                    "app:components.statistics.captions.number-of-events-attended-per-week"
                  )}
                </Typography>
                <Typography variant="h5">
                  {(
                    (props.events.length /
                      (new Date(mostNewEvent.end_datetime).getTime() -
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
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" align="center">
            {t("glossary:words.this-year")}
          </Typography>
          <Paper
            className={
              props.user ? classes.user + " " + classes.paper : classes.paper
            }
          >
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {t(
                    "app:components.statistics.captions.number-of-events-attended"
                  )}
                </Typography>
                <Typography variant="h5">{eventsPerYear}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">
                  {t(
                    "app:components.statistics.captions.number-of-events-attended-per-week"
                  )}
                </Typography>
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
