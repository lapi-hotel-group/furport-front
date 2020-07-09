import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import csc from "country-state-city";

import Star from "./Star";
import Attend from "./Attend";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(1),
  },
  cardContent: {
    paddingBottom: "0",
  },
  media: {
    height: 140,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
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
}));

export default function EventCard(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Grid container spacing={3}>
        {props.events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card className={classes.root}>
              <Link to={"/events/" + event.id} className={classes.link}>
                <CardActionArea>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {event.name}
                    </Typography>
                    <div>
                      <div className={classes.iconText}>
                        <TodayIcon className={classes.icon} />
                        <Typography>
                          {new Date(
                            event.start_datetime
                          ).toLocaleDateString() ===
                          new Date(event.end_datetime).toLocaleDateString()
                            ? new Date(
                                event.start_datetime
                              ).toLocaleDateString()
                            : new Date(
                                event.start_datetime
                              ).toLocaleDateString() +
                              " 〜 " +
                              new Date(event.end_datetime).toLocaleDateString()}
                        </Typography>
                      </div>
                    </div>
                    <div>
                      <div className={classes.iconText}>
                        <LocationOnIcon className={classes.icon} />
                        <Typography>
                          {t(
                            csc.getCountryById(event.country.toString()).name
                          ) +
                            " " +
                            t(csc.getStateById(event.state.toString()).name)}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Grid item xs={12} className={classes.stars}>
                  <Star
                    id={event.id}
                    events={props.events}
                    setEvents={props.setEvents}
                    stars={props.stars}
                    setStars={props.setStars}
                  />
                  <Attend
                    id={event.id}
                    events={props.events}
                    setEvents={props.setEvents}
                    attends={props.attends}
                    setAttends={props.setAttends}
                  />
                </Grid>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      )
    </>
  );
}
