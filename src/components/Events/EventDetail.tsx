import React, { useState, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
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
import Radio from "@material-ui/core/Radio";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import ReactMarkdown from "react-markdown";

import Star from "./Star";
import Attend from "./Attend";
import TagDetail from "./TagDetail";
import Attendees from "./Attendees";
import csc from "../../utils/csc";
import { AuthContext } from "../../auth/authContext";

import { Event } from "../../models";
import { IProfile } from "../../types";

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

interface IEventDetailProps {
  event?: Event;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[] | null>>;
  profile: IProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<IProfile | null>>;
  generalTagsQuery: string[];
  setGeneralTagsQuery: React.Dispatch<React.SetStateAction<string[]>>;
  organizationTagsQuery: string[];
  setOrganizationTagsQuery: React.Dispatch<React.SetStateAction<string[]>>;
  characterTagsQuery: string[];
  setCharacterTagsQuery: React.Dispatch<React.SetStateAction<string[]>>;
  dashboard: boolean;
}

const EventDetail: React.FC<IEventDetailProps> = (props) => {
  const classes = useStyles();
  const [timeZoneFormat, setTimeZoneFormat] = useState("browser");
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const params = useParams<{ id: string }>();
  const history = useHistory();

  let event: Event;
  if (!props.dashboard) {
    const findEvent = props.events.find((el) => el.id.toString() === params.id);
    if (!!findEvent) {
      event = findEvent;
    } else {
      history.push("/events/");
      return null;
    }
  } else {
    event = props.event || new Event();
  }

  const content = (
    <Grid container spacing={1} style={{ textAlign: "left" }}>
      <Grid item sm={6}>
        <div>
          <div className={classes.iconText}>
            <TodayIcon className={classes.icon} />
            <Typography style={{ whiteSpace: "pre-line" }}>
              {event.getDateTimeString(timeZoneFormat === "local")}
            </Typography>
          </div>
          <div>
            {event.timezone !== moment.tz.guess() && !event.no_time ? (
              <>
                <Radio
                  checked={timeZoneFormat === "browser"}
                  onChange={() => setTimeZoneFormat("browser")}
                  color="primary"
                  style={{ paddingTop: "0", paddingBottom: "0" }}
                />
                {t("app:components.events.event-detail.browser-time")}
                <br />
                <Radio
                  checked={timeZoneFormat === "local"}
                  onChange={() => setTimeZoneFormat("local")}
                  color="primary"
                />
                {t("app:components.events.event-detail.local-time", {
                  timezone: event.timezone,
                })}
              </>
            ) : null}
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
                ? t("common:enum.openness.open")
                : event.openness === 1
                ? t("common:enum.openness.friend_only")
                : t("common:enum.openness.private")}
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
      <Grid item sm={6}>
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
      )}
      <Grid item xs={12}>
        <Attendees event={event} />
      </Grid>
      <Grid item xs={12}>
        <ReactMarkdown source={event.description} />
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
              {t("app:components.events.event-detail.created-by", {
                createdBy: event.created_by,
              })}
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
          {
            <Dialog open onClose={() => history.push("/events/")}>
              <DialogTitle>{event.name}</DialogTitle>
              <DialogContent style={{ overflow: "visible" }}>
                {content}
              </DialogContent>
              <DialogActions>
                {event.created_by === authContext.userName ||
                props.profile?.is_moderator ? ( // eslint-disable-line camelcase
                  <Link
                    to={"/events/" + params.id + "/edit"}
                    className={classes.link}
                  >
                    <Button variant="contained" color="primary">
                      {t("common:ui.button.edit")}
                    </Button>
                  </Link>
                ) : null}
                <Button
                  variant="contained"
                  onClick={() => history.push("/events/")}
                  color="secondary"
                >
                  {t("common:ui.button.close")}
                </Button>
              </DialogActions>
            </Dialog>
          }
        </>
      )}
    </div>
  );
};

export default EventDetail;
