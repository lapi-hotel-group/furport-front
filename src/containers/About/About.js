import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: "700px",
    padding: theme.spacing(3),
  },
  link: {
    color: "inherit",
  },
}));

const About = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item align="center" xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                  {t("containers.about.about-this-service")}
                </Typography>
                <Typography>
                  {t("containers.about.what-is-this-service")}
                </Typography>
                <Typography>
                  {t("containers.about.contact-us-below")}
                </Typography>
                <Typography>
                  {t("containers.about.operator-sns.twitter")}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item align="center" xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                  {t("containers.about.for-developers")}
                </Typography>
                <Typography align="left">
                  {t("containers.about.waiting-for-your-contribution")}
                </Typography>
                <Typography align="left">
                  <ul>
                    <li>
                      <a
                        href="https://github.com/lapi-hotel-group/furport-front"
                        className={classes.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("containers.about.project-frontend-repository")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/lapi-hotel-group/furport-back"
                        className={classes.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("containers.about.project-backend-repository")}
                      </a>
                    </li>
                  </ul>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
