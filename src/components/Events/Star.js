import React, { useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { AuthContext } from "../../auth/authContext";

const useStyles = makeStyles((theme) => ({
  root: { display: "inline-flex", verticalAlign: "middle" },
}));

export default function Star(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const changeStarHandler = () => {
    const postData = {
      stared_by: authContext.userName,
    };
    const url = "/events/" + props.id + "/star/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        props.stared_by = response.data.stared_by;
      })
      .catch((err) => {});
  };

  return (
    <div className={classes.root} onClick={changeStarHandler}>
      {props.stared_by.find((el) => el === authContext.userName) ? (
        <StarIcon color="primary" />
      ) : (
        <StarBorderIcon />
      )}
    </div>
  );
}
