import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import PublicIcon from "@material-ui/icons/Public";
import Paper from "@material-ui/core/Paper";

import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import { Remarkable } from "remarkable";

import Star from "./Star";
import Attend from "./Attend";
import TagDetail from "./TagDetail";
import Attendees from "./Attendees";
import csc from "../../utils/csc";
import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  linkText: {
    textDecoration: "none",
    color: theme.palette.warning["main"],
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
  buttonIcon: {
    marginRight: theme.spacing(1),
    cursor: "pointer",
  },
  spacing: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  stars: {
    display: "inline-flex",
    padding: "0 !important",
  },
  paper: {
    maxWidth: "90%",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  markUp: {
    "& code": {
      padding: "2px 4px",
      fontSize: "90%",
      color: "#c7254e",
      backgroundColor: "#f9f2f4",
      borderRadius: "4px",
      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    },
  },
}));

export default function EventDetail(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const authContext = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const md = new Remarkable();
  const getRawMarkup = (str) => ({
    __html: md.render(str),
  });

  const handleClose = () => {
    setRedirect(true);
  };

  let event;
  if (!props.dashboard) {
    event = props.events.find(
      (el) => el.id.toString() === props.match.params.id
    );
  } else {
    event = props.event;
  }

  const content = !event ? null : (
    <Grid container spacing={1}>
      <Grid item sm={6} align="left">
        <div>
          <div className={classes.iconText}>
            <TodayIcon className={classes.icon} />
            <Typography>
              {new Date(event.start_datetime).toLocaleDateString() ===
              new Date(event.end_datetime).toLocaleDateString()
                ? new Intl.DateTimeFormat(i18n.language, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: event.timezone,
                  }).format(new Date(event.start_datetime))
                : new Intl.DateTimeFormat(i18n.language, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: event.timezone,
                  }).format(new Date(event.start_datetime)) +
                  " 〜 " +
                  new Intl.DateTimeFormat(i18n.language, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    timeZone: event.timezone,
                  }).format(new Date(event.end_datetime))}
            </Typography>
          </div>
        </div>
        <div>
          <div className={classes.iconText}>
            <LocationOnIcon className={classes.icon} />
            <Typography>
              {t(csc.getCountryById(event.country.toString()).name) +
                " " +
                t(csc.getStateById(event.state.toString()).name)}
            </Typography>
          </div>
        </div>
        {event.attendees ? (
          <div>
            <div className={classes.iconText}>
              <PeopleIcon className={classes.icon} />
              <Typography>{event.attendees}</Typography>
            </div>
          </div>
        ) : null}
        <div>
          <div className={classes.iconText}>
            <PublicIcon className={classes.icon} />
            <Typography>
              {event.openness === 0
                ? t("オープン")
                : event.openness === 1
                ? t("友達限定")
                : t("クローズド")}
            </Typography>
          </div>
        </div>
        {event.place ? (
          <div>
            <div className={classes.iconText}>
              <HomeIcon className={classes.icon} />
              <Typography>{event.place}</Typography>
            </div>
          </div>
        ) : null}
        {event.url ? (
          <div>
            <div className={classes.iconText}>
              <LinkIcon className={classes.icon} />
              <Typography>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.linkText}
                >
                  {event.url}
                </a>
              </Typography>
            </div>
          </div>
        ) : null}
        {event.twitter_id ? (
          <div>
            <div className={classes.iconText}>
              <TwitterIcon className={classes.icon} />
              <Typography>
                <a
                  href={"https://twitter.com/" + event.twitter_id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.linkText}
                >
                  {event.twitter_id}
                </a>
              </Typography>
            </div>
          </div>
        ) : null}
      </Grid>
      <Grid item sm={6} align="left">
        <TagDetail
          generalTags={event.general_tag}
          organizationTags={event.organization_tag}
          characterTags={event.character_tag}
          organizationTagsQuery={props.organizationTagsQuery}
          setOrganizationTagsQuery={props.setOrganizationTagsQuery}
          characterTagsQuery={props.characterTagsQuery}
          setCharacterTagsQuery={props.setCharacterTagsQuery}
          generalTagsQuery={props.generalTagsQuery}
          setGeneralTagsQuery={props.setGeneralTagsQuery}
          dashboard={props.dashboard}
        />
      </Grid>
      {props.dashboard ? null : (
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
      )}
      <Grid item xs={12} align="left">
        <Attendees event={event} />
      </Grid>
      <Grid item xs={12}>
        <Typography align="left" component="div" className={classes.markUp}>
          <div dangerouslySetInnerHTML={getRawMarkup(event.description)} />
        </Typography>
        {event.google_map_place_id ? (
          <iframe
            width="100%"
            title="Google map"
            src={
              "https://www.google.com/maps/embed/v1/place?key=" +
              process.env.REACT_APP_GOOGLE_MAP_API_KEY +
              "&q=place_id:" +
              event.google_map_place_id
            }
          />
        ) : null}
        {props.dashboard ? null : (
          <>
            <Divider className={classes.spacing} />
            <Typography
              gutterBottom
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              {t("作成者：") + event.created_by}
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );

  return (
    <div>
      {props.dashboard ? (
        <>
          {event ? (
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h6">
                {event.name}
              </Typography>
              {content}
            </Paper>
          ) : null}
        </>
      ) : (
        <>
          {redirect || !event ? (
            <Redirect to="/events" />
          ) : (
            <Dialog open onClose={handleClose}>
              <DialogTitle>{event.name}</DialogTitle>
              <DialogContent style={{ overflow: "visible" }}>
                {content}
              </DialogContent>
              <DialogActions>
                {event.created_by === authContext.userName ||
                props.isModerator ? (
                  <Link
                    to={"/events/" + props.match.params.id + "/edit"}
                    className={classes.link}
                  >
                    <Button variant="contained" color="primary">
                      {t("編集")}
                    </Button>
                  </Link>
                ) : null}
                <Button
                  variant="contained"
                  onClick={handleClose}
                  color="secondary"
                >
                  {t("閉じる")}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      )}
    </div>
  );
}
