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
  link: {
    color: "inherit",
    margin: theme.spacing(1),
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
                <Typography>
                  {t("2020/07/29：")}
                  <a
                    href="https://github.com/lapi-hotel-group/furport-front/releases/tag/v0.2.0"
                    className={classes.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    v0.2.0
                  </a>
                  {t("リリース")}
                </Typography>
              </li>
              <li>
                <Typography>
                  <Typography>
                    {t("2020/07/28：")}
                    <a
                      href="https://github.com/lapi-hotel-group/furport-front/releases/tag/v0.1.0"
                      className={classes.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      v0.1.0
                    </a>
                    {t("リリース")}
                  </Typography>
                </Typography>
              </li>
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
