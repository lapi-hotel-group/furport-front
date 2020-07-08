import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import TodayIcon from "@material-ui/icons/Today";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import { useTranslation } from "react-i18next";
import csc from "country-state-city";

import Star from "./Star";
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
  iconText: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

export default function EventDetail(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [event, setEvent] = useState({});
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClose = () => {
    setRedirect(true);
  };

  useEffect(() => {
    setLoading(true);
    const url = "/events/" + props.match.params.id + "/";
    axios
      .get(url)
      .then((response) => {
        const start = new Date(response.data.start_datetime);
        const end = new Date(response.data.end_datetime);
        const eventDate =
          start.toLocaleDateString() === end.toLocaleDateString()
            ? start.toLocaleDateString()
            : start.toLocaleDateString() + " 〜 " + end.toLocaleDateString();
        setEvent({
          ...response.data,
          eventDate: eventDate,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  }, [props.match.params.id]);

  return (
    <div>
      {redirect ? <Redirect to="/events" /> : null}
      <Dialog open onClose={handleClose}>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <DialogTitle>
              {event.name}
              <Star stared_by={event.stared_by} id={event.id} />
            </DialogTitle>
            <Divider />
            <DialogContent>
              {error.detail}
              <div>
                <div className={classes.iconText}>
                  <TodayIcon className={classes.icon} />
                  <Typography>{event.eventDate}</Typography>
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
              {event.url ? (
                <div>
                  <div className={classes.iconText}>
                    <LinkIcon className={classes.icon} />
                    <Typography>
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {event.url}
                      </a>
                    </Typography>
                  </div>
                </div>
              ) : null}
              <Divider />
              <Typography gutterBottom variant="body2" component="p">
                {event.description}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {t("作成者：") + event.created_by}
              </Typography>
            </DialogContent>
            <DialogActions>
              {event.created_by === authContext.userName ? (
                <Link
                  to={"/events/" + props.match.params.id + "/edit"}
                  className={classes.link}
                >
                  <Button color="primary" disabled={loading}>
                    {t("編集")}
                  </Button>
                </Link>
              ) : null}
              <Button onClick={handleClose} color="primary" disabled={loading}>
                {t("閉じる")}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
