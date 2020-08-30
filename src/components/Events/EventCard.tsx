import React from "react";
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
import { useHistory } from "react-router-dom";
import csc from "../../utils/csc";
import { scroller } from "react-scroll";

import Star from "./Star";
import Attend from "./Attend";

import { Event } from "../../models";
import { IProfile } from "../../types";

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

interface IEventCardProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
  sortedEvents: Event[];
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setShowId: React.Dispatch<React.SetStateAction<number>>;
  dashboard: boolean;
  user: boolean;
}

const EventCard: React.FC<IEventCardProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <Grid container spacing={1}>
        {props.sortedEvents
          .slice((props.page - 1) * PAGE_SIZE, props.page * PAGE_SIZE)
          .map((event, index) => (
            <Grid item xs={12} key={event.id}>
              <Card
                className={props.dashboard || props.user ? classes.root : ""}
                style={{ textAlign: "left" }}
              >
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
                          history.push("/events/" + event.id);
                        }
                  }
                >
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {event.name}
                    </Typography>
                    <div>
                      <div className={classes.iconText}>
                        <TodayIcon className={classes.icon} />
                        <Typography>{event.getDateString()}</Typography>
                      </div>
                    </div>
                    <div>
                      <div className={classes.iconText}>
                        <LocationOnIcon className={classes.icon} />
                        <Typography>
                          {t(csc.getCountryById(event.country.toString()).name)}{" "}
                          {t(csc.getStateById(event.state.toString()).name)}
                        </Typography>
                      </div>
                    </div>
                  </CardContent>
                </CardActionArea>
                {props.dashboard || props.user ? null : (
                  <CardActions>
                    <Grid item xs={12} className={classes.stars}>
                      <Star
                        id={event.id}
                        events={props.events}
                        setEvents={props.setEvents}
                        profile={props.profile}
                        setProfile={props.setProfile}
                      />
                      <Attend
                        id={event.id}
                        events={props.events}
                        setEvents={props.setEvents}
                        profile={props.profile}
                        setProfile={props.setProfile}
                      />
                    </Grid>
                  </CardActions>
                )}
              </Card>
            </Grid>
          ))}
      </Grid>
      {!props.dashboard && !props.user ? (
        <Box>
          <Pagination
            count={Math.ceil(props.sortedEvents.length / PAGE_SIZE)}
            color="primary"
            className={classes.pagination}
            page={props.page}
            onChange={(event, page) => props.setPage(page)}
          />
        </Box>
      ) : null}
    </>
  );
};

export default EventCard;
