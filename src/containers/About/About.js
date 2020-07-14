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
      </Grid>
    </>
  );
};

export default About;
