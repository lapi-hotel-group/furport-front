import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";

import blackLogo from "../../assets/img/furportLogo01.png";
import whiteLogo from "../../assets/img/furportLogo02.png";
import { ThemeContext } from "../../theme/themeContext";
import Fade from "../../components/UI/Fade";
import Search from "../../components/Home/Search";
import Star from "../../components/Home/Star";
import Chart from "../../components/Home/Chart";
import ChangeLog from "../../components/Home/ChangeLog";
import { Button } from "@material-ui/core";
import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  logoImage: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    width: "100%",
    maxWidth: "502px",
    height: "auto",
  },
  topMargin: {
    marginTop: theme.spacing(5),
  },
  horizonMargin: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const Home = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);

  const buttons = (
    <>
      {authContext.token ? (
        <Grid item align="center" xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.history.push("/dashboard");
            }}
            className={classes.horizonMargin}
          >
            {t("containers.home.ui.button.to-dashboard")}
          </Button>
        </Grid>
      ) : (
        <>
          <Grid item align="center" xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                props.history.push("/register");
              }}
              className={classes.horizonMargin}
            >
              {t("ui.button.register")}
            </Button>
          </Grid>
          <Grid item align="center" xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                props.history.push("/login");
              }}
              className={classes.horizonMargin}
            >
              {t("ui.button.login")}
            </Button>
          </Grid>
        </>
      )}
      <Grid item align="center" xs={12}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.history.push("/events");
          }}
        >
          {t("containers.home.ui.button.show-event-list")}
        </Button>
      </Grid>
    </>
  );
  return (
    <>
      <Grid container spacing={3}>
        <Grid item align="center" xs={12}>
          <img
            className={classes.logoImage}
            src={themeContext.isDark ? whiteLogo : blackLogo}
            alt="FurPort Logo"
          />
          <Typography gutterBottom variant="h4">
            {t("containers.home.catch-phrase")}
          </Typography>
        </Grid>
        <Grid item align="center" xs={12}>
          <Typography paragraph style={{ whiteSpace: "pre-line" }}>
            {t("containers.home.introductory-essay")}
          </Typography>
        </Grid>
        {buttons}
        <Grid item align="center" xs={12} className={classes.topMargin}>
          <Typography variant="h6">▽ MORE</Typography>
        </Grid>
        <Grid item align="center" xs={12} className={classes.topMargin}>
          <Fade>
            <Search />
          </Fade>
        </Grid>
        <Grid item align="center" xs={12} className={classes.topMargin}>
          <Fade>
            <Star />
          </Fade>
        </Grid>
        <Grid item align="center" xs={12} className={classes.topMargin}>
          <Fade>
            <Chart />
          </Fade>
        </Grid>
        <Grid item align="center" xs={12} className={classes.topMargin}>
          <Typography variant="h6">
            {t("containers.home.lets-get-started")}
          </Typography>
        </Grid>
        {buttons}
        <Grid item align="center" xs={12} className={classes.topMargin}>
          <ChangeLog />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
