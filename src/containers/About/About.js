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
                  {t("FurPortについて")}
                </Typography>
                <Typography>
                  {t(
                    "FurPortはファーリーイベントに関する情報を整理・共有するサービスです。"
                  )}
                </Typography>
                <Typography>
                  {t(
                    "るりいろ（lapi.gq）が個人で運営しております。問い合わせは下記までお願いします。"
                  )}
                </Typography>
                <Typography>{t("Twitter ID： @dragoneena12")}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item align="center" xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                  {t("開発者の方へ")}
                </Typography>
                <Typography align="left">
                  {t(
                    "FurPortはオープンソースプロジェクトです。バグ報告や機能追加リクエストをはじめとしたイシューやプルリクエストを歓迎しています！是非下記Githubリポジトリよりコントリビューションをお待ちしています。"
                  )}
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
                        {t("FurPortフロントエンドリポジトリ")}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/lapi-hotel-group/furport-back"
                        className={classes.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("FurPortバックエンドリポジトリ")}
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
