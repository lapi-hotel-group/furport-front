import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import { Route } from "react-router-dom";

import Search from "../../components/Events/Search";
import Sort from "../../components/Events/Sort";
import NewEvent from "../../components/Events/NewEvent";
import EventDetail from "../../components/Events/EventDetail";
import EventEdit from "../../components/Events/EventEdit";
import EventCard from "../../components/Events/EventCard";

const Events = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "/events/";
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data.results);
      })
      .catch((err) => {
        setError(err.response);
      });
  }, []);

  return (
    <>
      <h1>{t("イベント")}</h1>
      <Search />
      <Sort />
      <Route exact path="/events" component={NewEvent} />
      <Route exact path="/events/:id" component={EventDetail} />
      <Route exact path="/events/:id/edit" component={EventEdit} />
      {error ? error : null}
      <Grid container spacing={3}>
        {events.map((item) => (
          <EventCard
            key={item.id}
            Id={item.id}
            Name={item.name}
            Description={item.description}
            URL={item.url}
            ImageURL={item.image_url}
            StartDatetime={new Date(item.start_datetime)}
            EndDatetime={new Date(item.end_datetime)}
          />
        ))}
      </Grid>
    </>
  );
};

export default Events;
