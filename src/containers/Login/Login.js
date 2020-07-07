import React from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: "1em",
    marginLeft: "0",
  },
}));

const loginHandler = (e) => {
  e.preventDefault();
  const authData = {
    username: e.target.username.value,
    password: e.target.password.value,
  };
  const url = "/rest-auth/login/";
  axios
    .post(url, authData)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

const Login = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <h1>{t("ログイン")}</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.form}>
          <TextField required name="username" label={t("ユーザー名")} />
        </div>
        <div className={classes.form}>
          <TextField
            required
            name="password"
            label={t("パスワード")}
            type="password"
            autoComplete="current-password"
          />
        </div>
        <div className={classes.form}>
          <Button variant="contained" color="primary" type="submit">
            ログイン
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;
