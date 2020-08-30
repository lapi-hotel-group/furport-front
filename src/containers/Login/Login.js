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
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  buttonProgress: {
    color: "primary",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  form: {
    display: "block",
    textAlign: "center",
    "& .MuiTextField-root, .MuiButton-root": {
      margin: theme.spacing(2),
      maxWidth: "90%",
      display: "inline-block",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const Login = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [twitterLoading, setTwitterLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    errors: formErrors,
    setError: setFormError,
    clearErrors,
  } = useForm({
    criteriaMode: "all",
    mode: "onChange",
  });

  const loginHandler = (data) => {
    setLoading(true);
    const authData = {
      username: data.username,
      password: data.password,
    };
    const url = "/dj-rest-auth/login/";
    axios
      .post(url, authData)
      .then((response1) => {
        const url = "/profiles/" + response1.data.user.pk + "/";
        axios
          .get(url, {
            headers: {
              Authorization: "Bearer " + response1.data.access_token,
            },
          })
          .then((response2) => {
            authContext.setToken(
              response1.data.access_token,
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
          Object.entries(err.response.data).forEach(([key, value]) => {
            setFormError(key, { type: "manual", message: value });
          });
        } else {
          setError(err.message);
        }
        setLoading(false);
      });
  };

  const handleTwitterLogin = () => {
    setTwitterLoading(true);
    OAuth.initialize(process.env.REACT_APP_OAUTH_API_KEY);
    OAuth.popup("twitter")
      .done(function (result) {
        const authData = {
          access_token: result.oauth_token,
          token_secret: result.oauth_token_secret,
        };
        const url = "/dj-rest-auth/twitter/";
        axios
          .post(url, authData)
          .then((response1) => {
            const url = "/profiles/" + response1.data.user.pk + "/";
            axios
              .get(url, {
                headers: {
                  Authorization: "Bearer " + response1.data.access_token,
                },
              })
              .then((response2) => {
                authContext.setToken(
                  response1.data.access_token,
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
                setTwitterLoading(false);
              });
          })
          .catch((err) => {
            if (err.response) {
              setError(err.response.data);
            } else {
              setError(err.message);
              setTwitterLoading(false);
            }
          });
      })
      .fail((err) => {
        setError(err.message);
        setTwitterLoading(false);
      });
  };

  return (
    <>
      {authContext.token !== null ? <Redirect to="/dashboard" /> : null}
      <Grid container spacing={6} align="center">
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6} align="left">
              <Grid item xs={12}>
                <Typography align="center" variant="h5">
                  {t("app:containers.login.title")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form
                  onSubmit={handleSubmit(loginHandler)}
                  className={classes.form}
                >
                  <TextField
                    required
                    fullWidth
                    name="username"
                    label={t("common:form.username.label")}
                    inputRef={register({
                      required: true,
                      maxLength: {
                        value: 150,
                        message: t(
                          "common:form.validations.max-string-length.message",
                          {
                            maxLength: 150,
                          }
                        ),
                      },
                    })}
                    error={formErrors.username}
                    helperText={
                      formErrors.username
                        ? formErrors.username.message
                        : t(
                            "common:form.validations.max-string-length.annotation",
                            {
                              maxLength: 150,
                            }
                          )
                    }
                  />
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label={t("common:form.password.label")}
                    type="password"
                    inputRef={register({
                      required: true,
                      minLength: {
                        value: 8,
                        message: t(
                          "common:form.validations.min-string-length.message",
                          {
                            minLength: 8,
                          }
                        ),
                      },
                      maxLength: {
                        value: 128,
                        message: t(
                          "common:form.validations.max-string-length.message",
                          {
                            maxLength: 128,
                          }
                        ),
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/,
                        message: t(
                          "common:form.validations.alphanumeric-symbols.message"
                        ),
                      },
                    })}
                    error={formErrors.password}
                    helperText={
                      formErrors.password
                        ? formErrors.password.message
                        : t(
                            "common:form.validations.max-min-alphanumeric-symbols-length.message",
                            {
                              minLength: 8,
                              maxLength: 128,
                            }
                          )
                    }
                  />
                  <Typography align="center" color="error">
                    {formErrors.non_field_errors
                      ? formErrors.non_field_errors.message
                      : null}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading || twitterLoading}
                    onClick={() => clearErrors("non_field_errors")}
                  >
                    {t("common:ui.button.login")}
                    {loading && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={6} align="center">
              <Grid item xs={12}>
                <Button
                  onClick={handleTwitterLogin}
                  color="primary"
                  variant="contained"
                  className={classes.margin}
                  disabled={loading || twitterLoading}
                >
                  <TwitterIcon />
                  Sign in with Twitter
                  {twitterLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center" color="error">
            {error}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
