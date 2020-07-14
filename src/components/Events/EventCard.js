import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import csc from "country-state-city";
import { scroller } from "react-scroll";

import Star from "./Star";
import Attend from "./Attend";

const PAGE_SIZE = 10;

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    backgroundColor: theme.palette.background.default,
  },
  cardContent: {
    paddingBottom: "0",
  },
  media: {
    height: 140,
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
  pagination: {
    marginTop: theme.spacing(1),
    display: "inline-block",
  },
}));

const EventCard = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  return (
    <>
      <Grid container spacing={1}>
        {props.sortedEvents
          .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
          .map((event, index) => (
            <Grid item xs={12} key={event.id}>
              <Card className={props.dashboard ? classes.root : null}>
                <CardActionArea
                  onClick={
                    props.dashboard
                      ? () => {
                          props.setShowId(index);
                          scroller.scrollTo("recentEventDetail", {
                            duration: 500,
                            smooth: true,
                          });
                        }
                      : () => {
                          props.history.push("/events/" + event.id);
                        }
                  }
                >
                  <CardContent align="left" className={classes.cardContent}>
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
                {props.dashboard ? null : (
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
                )}
              </Card>
            </Grid>
          ))}
      </Grid>
      {!props.dashboard ? (
        <Box align="center">
          <Pagination
            count={Math.ceil(props.sortedEvents.length / PAGE_SIZE)}
            color="primary"
            className={classes.pagination}
            page={page}
            onChange={(event, page) => setPage(page)}
          />
        </Box>
      ) : null}
    </>
  );
};

export default withRouter(EventCard);
