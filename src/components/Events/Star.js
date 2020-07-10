import React, { useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: { fontSize: "18px", marginRight: theme.spacing(2) },
}));

export default function Star(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const addStarHandler = () => {
    const postData = {
      user: authContext.userId,
      star: [...props.stars, props.id],
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        props.setStars(response.data.star);
        const newEvents = [...props.events];
        newEvents[props.events.findIndex((el) => el.id === props.id)].stars++;
        props.setEvents(newEvents);
      })
      .catch((err) => {});
  };

  const removeStarHandler = () => {
    const postData = {
      user: authContext.userId,
      star: props.stars.filter((el) => el !== props.id),
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        props.setStars(response.data.star);
        const newEvents = [...props.events];
        newEvents[props.events.findIndex((el) => el.id === props.id)].stars--;
        props.setEvents(newEvents);
      })
      .catch((err) => {});
  };

  return (
    <div className={classes.root}>
      {props.stars ? (
        props.stars.find((el) => el === props.id) ? (
          <IconButton onClick={removeStarHandler}>
            <StarIcon color="error" />
          </IconButton>
        ) : (
          <IconButton onClick={addStarHandler}>
            <StarBorderIcon />
          </IconButton>
        )
      ) : (
        <IconButton>
          <StarBorderIcon />
        </IconButton>
      )}
      {props.events.filter((el) => el.id === props.id)[0].stars}
    </div>
  );
}
