import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    maxWidth: "700px",
  },
  cardContent: {
    paddingBottom: "0",
  },
  iconText: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  stars: {
    display: "inline-flex",
    padding: "0 !important",
  },
  grid: {
    padding: 0,
  },
}));

const Star = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [star, setStar] = useState(false);
  const [attend, setAttend] = useState(true);

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h5">
              {t("登録して忘れない")}
            </Typography>
            <Typography>
              {t("イベント参加を記録しましょう。お気に入り設定も簡単に。")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardContent align="left" className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Japan Meeting of Furries 2020
                  </Typography>
                  <div>
                    <div className={classes.iconText}>
                      <TodayIcon className={classes.icon} />
                      <Typography>2020/1/10 〜 2020/1/12</Typography>
                    </div>
                  </div>
                  <div>
                    <div className={classes.iconText}>
                      <LocationOnIcon className={classes.icon} />
                      <Typography>{t("Japan") + " " + t("Aichi")}</Typography>
                    </div>
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid item xs={12} className={classes.stars}>
                  {star ? (
                    <IconButton
                      onClick={() => {
                        setStar(!star);
                      }}
                    >
                      <StarIcon color="error" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setStar(!star);
                      }}
                    >
                      <StarBorderIcon />
                    </IconButton>
                  )}
                  {attend ? (
                    <IconButton
                      onClick={() => {
                        setAttend(!attend);
                      }}
                    >
                      <EventAvailableIcon htmlColor="#00AA90" />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => {
                        setAttend(!attend);
                      }}
                    >
                      <CalendarTodayIcon />
                    </IconButton>
                  )}
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Star;
