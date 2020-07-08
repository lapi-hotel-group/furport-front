import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
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
        setEvent(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  }, [props.match.params.id]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = {
      name: e.target.name.value,
      start_datetime: e.target.start_datetime.value,
      end_datetime: e.target.end_datetime.value,
      description: e.target.description.value,
      url: e.target.url.value,
      image_url: e.target.image_url.value,
    };
    const url = "/events/" + props.match.params.id + "/";
    axios
      .put(url, postData, {
        headers: { Authorization: "JWT " + authContext.token },
      })
      .then((response) => {
        setRedirect(response.data.id);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  return (
    <div>
      {redirect ? <Redirect to={"/events/" + props.match.params.id} /> : null}
      <Dialog open onClose={handleClose}>
        <DialogTitle>{t("イベント編集")}</DialogTitle>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={submitHandler}>
            <DialogContent>
              <TextField
                required
                name="name"
                label={t("イベント名")}
                type="text"
                defaultValue={event.name}
                fullWidth
                className={classes.field}
              />
              <TextField
                required
                name="start_datetime"
                label={t("開始時刻")}
                type="datetime-local"
                defaultValue={event.start_datetime.slice(0, -1)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.field}
              />
              <TextField
                required
                name="end_datetime"
                label={t("終了時刻")}
                type="datetime-local"
                defaultValue={event.end_datetime.slice(0, -1)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.field}
              />
              <TextField
                name="description"
                label={t("詳細")}
                type="text"
                defaultValue={event.description}
                fullWidth
                multiline
                rows={4}
                className={classes.field}
              />
              <TextField
                name="url"
                label={t("公式ページURL")}
                type="text"
                defaultValue={event.url}
                fullWidth
                className={classes.field}
              />
              <TextField
                name="image_url"
                label={t("画像URL")}
                type="text"
                defaultValue={event.image_url}
                fullWidth
                className={classes.field}
              />
              {error.detail}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" disabled={loading}>
                {t("キャンセル")}
              </Button>
              <Button type="submit" color="primary" disabled={loading}>
                {t("送信")}
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </div>
  );
}
