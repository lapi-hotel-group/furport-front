import React, { useState, useContext } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
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

export default function NewEvent() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [redirect, setRedirect] = useState(null);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    const url = "/events/";
    axios
      .post(url, postData, {
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

  if (!authContext.token) {
    return null;
  }

  return (
    <div>
      {redirect ? <Redirect to={"/events/" + redirect} /> : null}
      <Tooltip title="Add" aria-label="add" onClick={handleClickOpen}>
        <Fab color="primary" className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("イベント作成")}</DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <TextField
              required
              name="name"
              label={t("イベント名")}
              type="text"
              fullWidth
              className={classes.field}
            />
            <TextField
              required
              name="start_datetime"
              label={t("開始時刻")}
              type="datetime-local"
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
              fullWidth
              multiline
              rows={4}
              className={classes.field}
            />
            <TextField
              name="url"
              label={t("公式ページURL")}
              type="text"
              fullWidth
              className={classes.field}
            />
            <TextField
              name="image_url"
              label={t("画像URL")}
              type="text"
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
              {t("作成")}
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
