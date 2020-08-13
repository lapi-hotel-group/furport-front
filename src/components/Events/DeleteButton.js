import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  dangerButton: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));
export default function AlertDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = (e) => {
    setLoading(true);
    const url = "/events/" + props.id + "/";
    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + authContext.token },
      })
      .then((response) => {
        let newEvents = [...props.events];
        newEvents = newEvents.filter((event) => event.id !== +props.id);
        props.setEvents(newEvents);
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  return (
    <>
      <Button
        variant="contained"
        className={classes.dangerButton}
        onClick={handleClickOpen}
      >
        {t("削除")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("削除")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("イベント名「{{eventName}}」を本当に削除しますか？", {eventName: props.events.find((event) => event.id === +props.id).name})}
          </DialogContentText>
          {error ? error.detail : null}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            {t("キャンセル")}
          </Button>
          <Button
            variant="contained"
            className={classes.dangerButton}
            disabled={loading}
            onClick={deleteHandler}
          >
            {t("削除")}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
