import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    maxWidth: "700px",
  },
}));

const FollowList = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const handleUser = (username) => {
    history.push("/users/" + username);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={6} align="center">
          <Grid item xs={12}>
            <Typography variant="h5">
              {t("app:components.social.follow-list.title")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {props.followProfile.length ? (
              <>
                <List>
                  {props.followProfile.map((el) => (
                    <ListItem
                      key={el.user.id}
                      button
                      onClick={() => handleUser(el.user.username)}
                    >
                      <ListItemIcon>
                        <Avatar alt={el.user.username} src={el.avatar} />
                      </ListItemIcon>
                      <ListItemText primary={el.user.username} />
                    </ListItem>
                  ))}
                </List>
              </>
            ) : (
              <Typography>{t("common:messages.no-followees")}</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default FollowList;
