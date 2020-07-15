import React, { useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Chip from "@material-ui/core/Chip";

import { AuthContext } from "../../auth/authContext";

const FollowButton = (props) => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const addHandler = () => {
    const postData = {
      following: [...props.myProfile.following, props.profile.user.id],
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        props.setMyProfile(response.data);
      })
      .catch((err) => {});
  };

  const removeHandler = () => {
    const postData = {
      following: props.myProfile.following.filter(
        (el) => el !== props.profile.user.id
      ),
    };
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .put(url, postData, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        props.setMyProfile(response.data);
      })
      .catch((err) => {});
  };

  return (
    <>
      {props.myProfile.following.find((el) => el === props.profile.user.id) ? (
        <>
          <Chip
            label={t("フォロー中")}
            clickable
            color="primary"
            onClick={removeHandler}
          />
        </>
      ) : (
        <>
          <Chip
            label={t("フォローする")}
            clickable
            color="default"
            onClick={addHandler}
          />
        </>
      )}
    </>
  );
};

export default FollowButton;
