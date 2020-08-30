import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "700px",
    padding: theme.spacing(3),
    margin: `0 auto`,
  },
  link: {
    color: "inherit",
    margin: theme.spacing(1),
  },
}));

const ChangeLog: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            {t("イベント連携について")}
          </Typography>
          <Typography align="center">
            {t(
              "FurPort は下記のサービスとイベント情報を連携させていただいております。"
            )}
          </Typography>
          <a
            href="https://kmnevedb.work/"
            className={classes.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="h6" align="center">
              KMN PORTAL
            </Typography>
          </a>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChangeLog;
