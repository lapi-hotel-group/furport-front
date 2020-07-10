import React, { useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: "0",
  },
}));

export default function NewTag(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [tagName, setTagName] = useState("");
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event) => {
    setTagName(event.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = {
      name: tagName,
    };
    const url = "/" + props.kind + "_tags/";
    axios
      .post(url, postData, {
        headers: { Authorization: "JWT " + authContext.token },
      })
      .then((response) => {
        const newTags = [...props.tags];
        newTags.push(response.data);
        props.setTags(newTags);
        const newTagValue = [...props.tagValue];
        newTagValue.push(response.data);
        props.tagHandler(newTagValue);
        setLoading(false);
        handleClose();
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
    <div className={classes.root}>
      <IconButton>
        <AddCircleIcon onClick={handleClickOpen} />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("タグ新規作成")}</DialogTitle>
        <DialogContent>
          <TextField
            required
            name="name"
            label={t("タグ名")}
            type="text"
            value={tagName}
            onChange={handleChangeName}
            fullWidth
            className={classes.field}
          />
          {error.detail}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            {t("キャンセル")}
          </Button>
          <Button color="primary" disabled={loading} onClick={submitHandler}>
            {t("作成")}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
