import React, { useContext, useState } from "react";
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
  const [attends, setAttends] = useState(props.attends);
  const [count, setCount] = useState(props.count);
  const authContext = useContext(AuthContext);

  const addAttendHandler = () => {
    const postData = {
      user: authContext.userId,
      attend: [...attends, props.id],
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setAttends(response.data.attend);
        setCount(count + 1);
      })
      .catch((err) => {});
  };

  const removeAttendHandler = () => {
    const postData = {
      user: authContext.userId,
      attend: attends.filter((el) => el !== props.id),
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setAttends(response.data.attend);
        setCount(count - 1);
      })
      .catch((err) => {});
  };

  return (
    <div className={classes.root}>
      {attends ? (
        <IconButton>
          {attends.find((el) => el === props.id) ? (
            <EventAvailableIcon
              htmlColor="#00AA90"
              onClick={removeAttendHandler}
            />
          ) : (
            <CalendarTodayIcon onClick={addAttendHandler} />
          )}
        </IconButton>
      ) : (
        <IconButton>
          <CalendarTodayIcon />
        </IconButton>
      )}
      {count}
    </div>
  );
}
