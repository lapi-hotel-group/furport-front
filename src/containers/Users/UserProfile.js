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
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/profiles/?username=" + props.match.params.username;
    axios
      .get(url)
      .then((response) => {
        if (response.data.count) {
          setProfile(response.data.results[0]);
        } else {
          setError("404 Not Found");
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, [props.match.params.username]);

  return (
    <>
      {!profile ? (
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
                    {profile.user.username}
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
