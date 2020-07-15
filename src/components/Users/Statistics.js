import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Papers from "../Statistics/Papers";
import AttendCountBarChart from "../Statistics/AttendCountBarChart";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const Statistics = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={6} align="center">
          <Grid item xs={12}>
            <Typography variant="h5">{t("統計")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Papers events={props.events} user />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              {t("参加イベント数 / 月")}
            </Typography>
            <AttendCountBarChart events={props.events} />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Statistics;
