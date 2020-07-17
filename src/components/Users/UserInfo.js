import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import TwitterIcon from "@material-ui/icons/Twitter";

import FollowButton from "./FollowButton";

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
  linkText: {
    textDecoration: "none",
    color: theme.palette.warning["main"],
  },
  iconText: {
    display: "inline-flex",
    verticalAlign: "middle",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
  username: {
    marginTop: theme.spacing(3),
  },
}));

const UserInfo = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={6} align="center">
          <Grid item xs={12}>
            <Avatar
              alt="Avatar"
              src={props.profile.avatar}
              className={classes.avatar}
            />
            <div className={classes.button}>
              <FollowButton
                profile={props.profile}
                myProfile={props.myProfile}
                setMyProfile={props.setMyProfile}
              />
            </div>
            <Typography variant="h5" paragraph className={classes.username}>
              {props.profile.user.username}
            </Typography>
            {props.profile.is_moderator ? (
              <div className={classes.button}>
                <Chip
                  label={t("モデレーター")}
                  clickable
                  color="primary"
                  onDelete={() => {}}
                  deleteIcon={<DoneIcon />}
                />
              </div>
            ) : null}
            {props.profile.twitter_id ? (
              <div className={classes.iconText}>
                <TwitterIcon className={classes.icon} />
                <Typography>
                  <a
                    href={"https://twitter.com/" + props.profile.twitter_id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.linkText}
                  >
                    {props.profile.twitter_id}
                  </a>
                </Typography>
              </div>
            ) : null}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserInfo;
