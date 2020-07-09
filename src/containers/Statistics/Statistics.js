import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

import AttendCountChart from "../../components/Statistics/AttendCountChart";
import { AuthContext } from "../../auth/authContext";

const Statistics = () => {
  const { t } = useTranslation();
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [error, setError] = useState(null);
  const [attends, setAttends] = useState(null);
  const [events, setEvents] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const url = "/events/";
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data.results);
        setLoadingEvents(false);
      })
      .catch((err) => {
        setError(err.response);
        setLoadingEvents(false);
      });
  }, []);
  useEffect(() => {
    const url = "/profiles/" + authContext.userId + "/";
    axios
      .get(url, {
        headers: {
          Authorization: "JWT " + authContext.token,
        },
      })
      .then((response) => {
        setAttends(response.data.attend);
        setLoadingProfiles(false);
      })
      .catch((err) => {
        setLoadingProfiles(false);
      });
  }, [authContext.token, authContext.userId]);

  return (
    <>
      <h1>{t("統計")}</h1>
      {loadingEvents || loadingProfiles || error ? null : (
        <AttendCountChart attends={attends} events={events} />
      )}
      {error}
    </>
  );
};

export default Statistics;
