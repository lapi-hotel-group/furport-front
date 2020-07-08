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
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";

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
            <DialogTitle>{event.name}</DialogTitle>
            <DialogContent>
              {event.image_url ? (
                <img
                  className={classes.media}
                  src={event.image_url}
                  alt={event.name}
                />
              ) : null}
              {error.detail}
              <Typography gutterBottom>
                {t("開催日時：") + event.eventDate}
              </Typography>
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
              {props.URL ? (
                <Button size="small" color="primary">
                  <a href={props.URL} className={classes.link}>
                    {t("公式ページ")}
                  </a>
                </Button>
              ) : null}
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
