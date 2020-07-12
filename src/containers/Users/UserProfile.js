import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "200px",
    height: "200px",
    margin: "auto",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const UserProfile = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/users/" + props.match.params.id + "/";
    axios
      .get(url)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [props.match.params.id]);

  useEffect(() => {
    const url = "/profiles/" + props.match.params.id + "/";
    axios
      .get(url)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [props.match.params.id]);

  return (
    <>
      {!user || !profile ? (
        error ? (
          <Typography>{error}</Typography>
        ) : (
          <LinearProgress />
        )
      ) : (
        <Grid container spacing={6} align="center">
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={6} align="center">
                <Grid item xs={12}>
                  <Avatar
                    alt="Avatar"
                    src={profile.avatar}
                    className={classes.avatar}
                  />
                  <Typography variant="h5" paragraph>
                    {user.username}
                  </Typography>
                  {profile.is_moderator ? (
                    <Chip
                      label={t("モデレーター")}
                      clickable
                      color="primary"
                      onDelete={() => {}}
                      deleteIcon={<DoneIcon />}
                    />
                  ) : null}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserProfile;
