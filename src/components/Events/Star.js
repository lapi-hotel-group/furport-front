import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: { display: "inline-flex", verticalAlign: "middle" },
}));

export default function Star(props) {
  const classes = useStyles();
  const [stars, setStars] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .get(url, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setStars(response.data.star);
      })
      .catch((err) => {});
  }, [authContext.token, authContext.userId]);

  const addStarHandler = () => {
    const postData = {
      user: authContext.userId,
      star: [...stars, props.id],
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setStars(response.data.star);
      })
      .catch((err) => {});
  };

  const removeStarHandler = () => {
    const postData = {
      user: authContext.userId,
      star: stars.filter((el) => el !== props.id),
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setStars(response.data.star);
      })
      .catch((err) => {});
  };

  return (
    <div className={classes.root}>
      {stars ? (
        <IconButton>
          {stars.find((el) => el === props.id) ? (
            <StarIcon color="error" onClick={removeStarHandler} />
          ) : (
            <StarBorderIcon onClick={addStarHandler} />
          )}
        </IconButton>
      ) : null}
    </div>
  );
}
