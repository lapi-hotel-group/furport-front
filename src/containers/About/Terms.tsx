import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { terms } from "../../assets/text/terms";
import { privacyPolicy } from "../../assets/text/privacyPolicy";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "700px",
    padding: theme.spacing(3),
  },
  link: {
    color: "inherit",
  },
}));

const Terms: React.FC = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <>
      <Grid container justify="center" spacing={3}>
        <Grid container justify="center" item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ReactMarkdown source={terms} />
                <Typography align="right">
                  {t("{{date}} 制定", {
                    date: new Intl.DateTimeFormat(language, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date("2020-07-15")),
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid container justify="center" item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ReactMarkdown source={privacyPolicy} />
                <Typography align="right">
                  {t("{{date}} 制定", {
                    date: new Intl.DateTimeFormat(language, {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date("2020-07-15")),
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Terms;
