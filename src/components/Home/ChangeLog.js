import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, Box } from "@material-ui/core";

import releases from "../../releases.json";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
  link: {
    color: "inherit",
    margin: theme.spacing(1),
  },
}));

const ChangeLog = (props) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const content = releases.map((el, i) => (
    <li key={i}>
      <Typography>
        {t("{{date}}：", {
          date: new Intl.DateTimeFormat(language, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date(el.created_at)),
        })}
        <a
          href={el.url}
          className={classes.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {el.tag_name}
        </a>
        {t("リリース")}
      </Typography>
    </li>
  ));
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            {t("更新履歴")}
          </Typography>
          <Box align="left">
            <ul>{content}</ul>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChangeLog;
