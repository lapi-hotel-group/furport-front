import React from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const ChangeLog = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            {t("更新履歴")}
          </Typography>
          <Box align="left">
            <ul>
              <li>
                <Typography>{t("2020/07/21： 公開")}</Typography>
              </li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChangeLog;
