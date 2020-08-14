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
import Typography from "@material-ui/core/Typography";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

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
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);
  const { t } = useTranslation();
  const { register, getValues, errors: formErrors } = useForm({
    criteriaMode: "all",
    mode: "onChange",
  });

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
      name: getValues("name"),
    };
    const url = "/" + props.kind + "_tags/";
    axios
      .post(url, postData, {
        headers: { Authorization: "Bearer " + authContext.token },
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
        if (err.response) {
          setError(err.response.data);
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  };

  if (!authContext.token) {
    return null;
  }

  return (
    <div className={classes.root}>
      <IconButton onClick={handleClickOpen}>
        <AddCircleIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("タグ新規作成")}</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            name="name"
            label={t("タグ名")}
            type="text"
            inputRef={register({
              required: true,
              maxLength: {
                value: 64,
                message: t("{{maxLength}}文字以内にしてください。", {
                  maxLength: 64,
                }),
              },
              pattern: {
                value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
                message: t("英数記号のみを使用してください。"),
              },
            })}
            fullWidth
            className={classes.field}
            error={formErrors.name}
            helperText={
              formErrors.name
                ? formErrors.name.message
                : t("半角英数記号{{maxLength}}文字以内", { maxLength: 64 })
            }
          />
          <Typography align="center" color="error">
            {error}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            disabled={loading || formErrors.name || !getValues("name")}
            onClick={submitHandler}
          >
            {t("作成")}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="contained"
            disabled={loading}
          >
            {t("キャンセル")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
