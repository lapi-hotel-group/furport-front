import React, { useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import IconButton from "@material-ui/core/IconButton";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: { fontSize: "18px" },
}));

export default function Attend(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const addAttendHandler = () => {
    const postData = {
      user: authContext.userId,
      attend: [...props.attends, props.id],
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        props.setAttends(response.data.attend);
        const newEvents = [...props.events];
        newEvents[props.events.findIndex((el) => el.id === props.id)].attends++;
        props.setEvents(newEvents);
      })
      .catch((err) => {});
  };

  const removeAttendHandler = () => {
    const postData = {
      user: authContext.userId,
      attend: props.attends.filter((el) => el !== props.id),
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        props.setAttends(response.data.attend);
        const newEvents = [...props.events];
        newEvents[props.events.findIndex((el) => el.id === props.id)].attends--;
        console.log(newEvents);
        props.setEvents(newEvents);
      })
      .catch((err) => {});
  };

  return (
    <div className={classes.root}>
      {props.attends ? (
        props.attends.find((el) => el === props.id) ? (
          <IconButton onClick={removeAttendHandler}>
            <EventAvailableIcon htmlColor="#00AA90" />
          </IconButton>
        ) : (
          <IconButton onClick={addAttendHandler}>
            <CalendarTodayIcon />
          </IconButton>
        )
      ) : (
        <IconButton>
          <CalendarTodayIcon />
        </IconButton>
      )}
      {props.events.filter((el) => el.id === props.id)[0].attends}
    </div>
  );
}
