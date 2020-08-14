import React, { useState, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const ChangePassword = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword1, setNewPassword1] = useState(null);
  const [newPassword2, setNewPassword2] = useState(null);
  const authContext = useContext(AuthContext);

  const changePasswordHandler = (e) => {
    setLoading(true);
    setError(null);
    const url = "/dj-rest-auth/password/change/";
    const postData = {
      old_password: oldPassword,
      new_password1: newPassword1,
      new_password2: newPassword2,
    };
    axios
      .post(url, postData, {
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
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

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {t("パスワード変更")}
          </Typography>
          <TextField
            required
            name="old_password"
            label={t("現在のパスワード")}
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            fullWidth
            className={classes.field}
            error={error ? error.old_password : false}
            helperText={
              error ? <Typography>{error.old_password}</Typography> : null
            }
          />
          <TextField
            required
            name="new_password1"
            label={t("新しいパスワード")}
            type="password"
            value={newPassword1}
            onChange={(e) => {
              setNewPassword1(e.target.value);
            }}
            fullWidth
            className={classes.field}
            error={error ? error.new_password1 : false}
            helperText={
              <>
                <Typography>
                  {t("{{minLength}}文字以上{{maxLength}}文字以下", {
                    minLength: 8,
                    maxLength: 128,
                  })}
                </Typography>
                {error ? <Typography>{error.new_password1}</Typography> : null}
              </>
            }
          />
          <TextField
            required
            name="new_password2"
            label={t("新しいパスワード（確認）")}
            type="password"
            value={newPassword2}
            onChange={(e) => {
              setNewPassword2(e.target.value);
            }}
            fullWidth
            className={classes.field}
            error={error ? error.new_password2 : false}
            helperText={
              error ? <Typography>{error.new_password2}</Typography> : null
            }
          />
        </CardContent>
        <CardActions>
          <Grid item xs={12} align="right">
            {success ? (
              <Chip
                label={"パスワードを正常に変更しました！"}
                clickable
                color="primary"
                onDelete={() => setSuccess(false)}
                deleteIcon={<DoneIcon />}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={changePasswordHandler}
                disabled={loading}
              >
                {t("更新")}
              </Button>
            )}
            {/* {error ? <Typography>{error}</Typography> : null} */}
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default ChangePassword;
