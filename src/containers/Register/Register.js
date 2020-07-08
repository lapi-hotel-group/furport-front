import React, { useState, useContext } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../auth/authContext";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "1em",
    marginLeft: "0",
  },
  buttonProgress: {
    color: "primary",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

const Register = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const authContext = useContext(AuthContext);

  const registerHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const authData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password1: e.target.password1.value,
      password2: e.target.password2.value,
    };
    const url = "/rest-auth/registration/";
    axios
      .post(url, authData)
      .then((response) => {
        authContext.setToken(
          response.data.token,
          response.data.user.username,
          response.data.user.pk
        );
      })
      .catch((err) => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  return (
    <>
      {authContext.token !== null ? <Redirect to="/" /> : null}
      <h1>{t("新規登録")}</h1>
      <form onSubmit={registerHandler}>
        <div className={classes.form}>
          <TextField
            required
            name="username"
            label={t("ユーザー名")}
            error={error.username}
            helperText={error.username}
          />
        </div>
        <div className={classes.form}>
          <TextField
            required
            name="email"
            label={t("メールアドレス")}
            error={error.email}
            helperText={error.email}
          />
        </div>
        <div className={classes.form}>
          <TextField
            required
            name="password1"
            label={t("パスワード")}
            type="password"
            autoComplete="current-password"
            error={error.password1}
            helperText={error.password1}
          />
        </div>
        <div className={classes.form}>
          <TextField
            required
            name="password2"
            label={t("パスワード（確認）")}
            type="password"
            autoComplete="current-password"
            error={error.password2}
            helperText={error.password2}
          />
        </div>
        <div className={classes.form}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {t("新規登録")}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </div>
      </form>
      {error.non_field_errors}
    </>
  );
};

export default Register;
