import React, { useState, useContext } from "react";
import axios from "axios";
import { OAuth } from "oauthio-web";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../../auth/authContext";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";

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
  margin: {
    marginTop: "1em",
  },
}));

const Login = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);

  const loginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const authData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const url = "/rest-auth/login/";
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

  const handleTwitterLogin = () => {
    OAuth.initialize(process.env.REACT_APP_OAUTH_API_KEY);
    OAuth.popup("twitter")
      .done(function (result) {
        const authData = {
          access_token: result.oauth_token,
          token_secret: result.oauth_token_secret,
        };
        const url = "/rest-auth/twitter/";
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
            setError(err.response.data.detail);
          });
      })
      .fail((err) => {
        setError(err);
      });
  };

  return (
    <>
      {authContext.token !== null ? <Redirect to="/" /> : null}
      <h1>{t("ログイン")}</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.form}>
          <TextField
            required
            name="username"
            label={t("ユーザー名")}
            type="text"
            error={error}
            helperText={error ? error.username : null}
          />
        </div>
        <div className={classes.form}>
          <TextField
            required
            name="password"
            label={t("パスワード")}
            type="password"
            autoComplete="current-password"
            error={error}
            helperText={error ? error.password : null}
          />
        </div>
        <div className={classes.form}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {t("ログイン")}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Button>
        </div>
      </form>
      <Button
        onClick={handleTwitterLogin}
        color="primary"
        variant="contained"
        className={classes.margin}
      >
        <TwitterIcon />
        Sign in with Twitter
      </Button>
      <Typography>{error}</Typography>
    </>
  );
};

export default Login;
