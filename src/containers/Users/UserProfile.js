import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import UserInfo from "../../components/Users/UserInfo";
import AttendEvents from "../../components/Users/AttendEvents";
import Statistics from "../../components/Users/Statistics";

const UserProfile = (props) => {
  const [profile, setProfile] = useState(null);
  const [recentEvents, setRecentEvents] = useState(null);
  const [attendEvents, setAttendEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/profiles/?username=" + props.match.params.username;
    axios
      .get(url)
      .then((response) => {
        if (response.data.count) {
          setProfile(response.data.results[0]);
          const url = "/events/";
          const params = new URLSearchParams({
            limit: 3,
            ordering: "start_datetime",
            min_end_datetime: new Date().toISOString(),
            q_ids: response.data.results[0].attend.join(","),
          });
          axios
            .get(url + "?" + params.toString())
            .then((response) => {
              setRecentEvents(response.data.results);
            })
            .catch((err) => {
              if (err.response) {
                setError(err.response.data.detail);
              } else {
                setError(err.message);
              }
            });
          const params2 = new URLSearchParams({
            q_ids: response.data.results[0].attend.join(","),
          });
          axios
            .get(url + "?" + params2.toString())
            .then((response) => {
              setAttendEvents(response.data.results);
            })
            .catch((err) => {
              if (err.response) {
                setError(err.response.data.detail);
              } else {
                setError(err.message);
              }
            });
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
      {!profile || !recentEvents || !attendEvents ? (
        error ? (
          <Typography>{error}</Typography>
        ) : (
          <LinearProgress />
        )
      ) : (
        <Grid container spacing={6} align="center">
          <Grid item xs={12}>
            <UserInfo profile={profile} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Statistics profile={profile} events={attendEvents} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <AttendEvents profile={profile} events={recentEvents} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UserProfile;
