import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
  media: {
    height: 140,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function EventCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const eventDate =
    props.StartDatetime.toLocaleDateString() ===
    props.EndDatetime.toLocaleDateString()
      ? props.StartDatetime.toLocaleDateString()
      : props.StartDatetime.toLocaleDateString() +
        " 〜 " +
        props.EndDatetime.toLocaleDateString();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <Link to={"/events/" + props.Id} className={classes.link}>
          <CardActionArea>
            {props.ImageURL ? (
              <CardMedia
                className={classes.media}
                image={props.ImageURL}
                title={props.Name}
              />
            ) : null}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.Name}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textPrimary"
                component="h2"
              >
                {eventDate}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.Description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>

        {props.URL ? (
          <CardActions>
            <Button size="small" color="primary">
              <a href={props.URL} className={classes.link}>
                {t("公式ページ")}
              </a>
            </Button>
          </CardActions>
        ) : null}
      </Card>
    </Grid>
  );
}
