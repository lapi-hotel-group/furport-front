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
import { useTranslation } from "react-i18next";
import csc from "country-state-city";

import Star from "./Star";
import Attend from "./Attend";
import TagDetail from "./TagDetail";
import { AuthContext } from "../../auth/authContext";
import { Grid } from "@material-ui/core";

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
}));

export default function EventDetail(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClose = () => {
    setRedirect(true);
  };

  const event = props.events.find(
    (el) => el.id.toString() === props.match.params.id
  );

  return (
    <div>
      {redirect ? <Redirect to="/events" /> : null}
      <Dialog open onClose={handleClose}>
        <>
          <DialogTitle>{event.name}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item sm={6}>
                <div>
                  <div className={classes.iconText}>
                    <TodayIcon className={classes.icon} />
                    <Typography>
                      {new Date(event.start_datetime).toLocaleDateString() ===
                      new Date(event.end_datetime).toLocaleDateString()
                        ? new Date(event.start_datetime).toLocaleDateString()
                        : new Date(event.start_datetime).toLocaleDateString() +
                          " 〜 " +
                          new Date(event.end_datetime).toLocaleDateString()}
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
                  generalTagsNow={event.general_tag}
                  organizationTagsNow={event.organization_tag}
                  characterTagsNow={event.character_tag}
                  generalTags={props.generalTags}
                  organizationTags={props.organizationTags}
                  characterTags={props.characterTags}
                />
              </Grid>
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
              <Grid item xs={12}>
                <Typography gutterBottom variant="body2" component="p">
                  {event.description}
                </Typography>
                {event.google_map_place_id ? (
                  <iframe
                    width="100%"
                    title="Google map"
                    src={
                      "https://www.google.com/maps/embed/v1/place?key=***REMOVED***&q=place_id:" +
                      event.google_map_place_id
                    }
                  />
                ) : null}
                <Divider className={classes.spacing} />
                <Typography
                  gutterBottom
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  {t("作成者：") + event.created_by}
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            {event.created_by === authContext.userName ? (
              <Link
                to={"/events/" + props.match.params.id + "/edit"}
                className={classes.link}
              >
                <Button variant="contained" color="primary">
                  {t("編集")}
                </Button>
              </Link>
            ) : null}
            <Button variant="contained" onClick={handleClose} color="secondary">
              {t("閉じる")}
            </Button>
          </DialogActions>
        </>
      </Dialog>
    </div>
  );
}
