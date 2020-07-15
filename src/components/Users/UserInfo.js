import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";

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
            <Typography variant="h5" paragraph>
              {props.profile.user.username}
            </Typography>
            {props.profile.is_moderator ? (
              <Chip
                label={t("モデレーター")}
                clickable
                color="primary"
                onDelete={() => {}}
                deleteIcon={<DoneIcon />}
              />
            ) : null}
            <FollowButton
              profile={props.profile}
              myProfile={props.myProfile}
              setMyProfile={props.setMyProfile}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserInfo;
