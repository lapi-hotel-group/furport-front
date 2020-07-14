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
            {t("ダッシュボードへ")}
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
              {t("新規登録")}
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
              {t("ログイン")}
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
          {t("イベント一覧を見る")}
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
            {t("歴史を作るためのファーリーイベントデータベース")}
          </Typography>
        </Grid>
        <Grid item align="center" xs={12}>
          <Typography paragraph>
            {t(
              "1年前どんなイベントに参加していましたか？これまで累計でファーリーイベントに何回参加していますか？これらの質問に答えられる人はあまり多くないでしょう。"
            )}
            <br />
            {t(
              "FurPortは数多くのファーリーイベントを記録し、整理し、忘れないために生まれました。過去を知り、現在を知ろう。"
            )}
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
          <Typography variant="h6">{t("さあ、始めましょう")}</Typography>
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
