import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { OAuth } from "oauthio-web";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import TwitterIcon from "@material-ui/icons/Twitter";
import Chip from "@material-ui/core/Chip";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const SocialConnections = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  const [twitterConnectId, setTwitterConnectId] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const url = "/accounts/social/connections/";
    axios
      .get(url, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        if (response.data.results.length) {
          setTwitterConnectId(response.data.results[0].id);
        } else {
          setTwitterConnectId(null);
        }
      })
      .catch((err) => {
        setError(err.response.data.detail);
      });
  }, [connected, authContext.token]);

  const handleTwitterConnection = () => {
    OAuth.initialize(process.env.REACT_APP_OAUTH_API_KEY);
    OAuth.popup("twitter")
      .done(function (result) {
        const authData = {
          access_token: result.oauth_token,
          token_secret: result.oauth_token_secret,
        };
        const url = "/rest-auth/twitter/connect/";
        axios
          .post(url, authData, {
            headers: {
              Authorization: "JWT " + authContext.token,
            },
          })
          .then(() => {
            const url = "/profiles/" + authContext.userId + "/";
            axios
              .get(url, {
                headers: {
                  Authorization: "JWT " + authContext.token,
                },
              })
              .then((response) => {
                authContext.setToken(
                  authContext.token,
                  authContext.userName,
                  authContext.userId,
                  response.data.avatar
                );
                setConnected(!connected);
              })
              .catch((err) => {
                if (err.response) {
                  setError(err.response.data.detail);
                } else {
                  setError(err.message);
                }
              });
          })
          .catch((err) => {
            setError(err.response.data.detail);
          });
      })
      .fail((err) => {
        setError(err);
      });
  };

  const handleTwitterDisconnection = () => {
    const url = "socialaccounts/" + twitterConnectId + "/disconnect/";
    axios
      .post(
        url,
        {},
        {
          headers: {
            Authorization: "JWT " + authContext.token,
          },
        }
      )
      .then(() => {
        const url = "/profiles/" + authContext.userId + "/";
        axios
          .get(url, {
            headers: {
              Authorization: "JWT " + authContext.token,
            },
          })
          .then((response) => {
            authContext.setToken(
              authContext.token,
              authContext.userName,
              authContext.userId,
              null
            );
            setConnected(!connected);
          })
          .catch((err) => {
            if (err.response) {
              setError(err.response.data.detail);
            } else {
              setError(err.message);
            }
          });
      })
      .catch((err) => {
        setError(err.response.data.detail);
      });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {t("ソーシャルアカウント連携")}
          </Typography>

          {twitterConnectId ? (
            <>
              <Chip
                label={t("連携済み")}
                clickable
                onClick={handleTwitterDisconnection}
                color="primary"
                icon={<TwitterIcon />}
              />
            </>
          ) : (
            <>
              <Chip
                label={t("未連携")}
                clickable
                onClick={handleTwitterConnection}
                color="inherit"
                icon={<TwitterIcon />}
              />
            </>
          )}
        </CardContent>
      </Card>
      {error}
    </>
  );
};

export default SocialConnections;
