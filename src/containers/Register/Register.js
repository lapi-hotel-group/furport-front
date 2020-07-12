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

const Register = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);

  const registerHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const authData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const url = "/users/";
    axios
      .post(url, authData)
      .then((response) => {
        const url = "/rest-auth/login/";
        axios
          .post(url, authData)
          .then((response1) => {
            const url = "/profiles/" + response1.data.user.pk + "/";
            axios
              .get(url, {
                headers: {
                  Authorization: "JWT " + response1.data.token,
                },
              })
              .then((response2) => {
                authContext.setToken(
                  response1.data.token,
                  response1.data.user.username,
                  response1.data.user.pk,
                  response2.data.avatar
                );
              })
              .catch((err) => {
                if (err.response) {
                  setError(err.response.data.detail);
                } else {
                  setError(err.message);
                }
                setLoading(false);
              });
          })
          .catch((err) => {
            if (err.response) {
              setError(err.response.data.detail);
            } else {
              setError(err.message);
            }
            setLoading(false);
          });
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
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
          .then((response1) => {
            const url = "/profiles/" + response1.data.user.pk + "/";
            axios
              .get(url, {
                headers: {
                  Authorization: "JWT " + response1.data.token,
                },
              })
              .then((response2) => {
                authContext.setToken(
                  response1.data.token,
                  response1.data.user.username,
                  response1.data.user.pk,
                  response2.data.avatar
                );
              })
              .catch((err) => {
                if (err.response) {
                  setError(err.response.data.detail);
                } else {
                  setError(err.message);
                }
                setLoading(false);
              });
          })
          .catch((err) => {
            if (err.response) {
              setError(err.response.data.detail);
            } else {
              setError(err.message);
            }
          });
      })
      .fail((err) => {
        setError(err);
      });
  };

  return (
    <>
      {authContext.token !== null ? <Redirect to="/dashboard" /> : null}
      <h1>{t("新規登録")}</h1>
      <form onSubmit={registerHandler}>
        <div className={classes.form}>
          <TextField
            required
            name="username"
            label={t("ユーザー名")}
            error={error}
            helperText={error ? error.username : null}
          />
        </div>
        <div className={classes.form}>
          <TextField
            required
            name="email"
            label={t("メールアドレス")}
            error={error}
            helperText={error ? error.email : null}
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
            helperText={
              error ? (
                error.password
              ) : (
                <Typography>{t("8文字以上128文字以下")}</Typography>
              )
            }
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
      <Button
        onClick={handleTwitterLogin}
        color="primary"
        variant="contained"
        className={classes.margin}
        disabled={loading}
      >
        <TwitterIcon />
        Sign in with Twitter
      </Button>
      <Typography>{error}</Typography>
    </>
  );
};

export default Register;
