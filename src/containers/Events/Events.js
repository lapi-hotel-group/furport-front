import React from "react";
import { useTranslation } from "react-i18next";
import { Route } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";

import Search from "../../components/Events/Search";
import Sort from "../../components/Events/Sort";
import NewEvent from "../../components/Events/NewEvent";
import EventDetail from "../../components/Events/EventDetail";
import EventEdit from "../../components/Events/EventEdit";
import EventTable from "../../components/Events/EventTable";
import EventCard from "../../components/Events/EventCard";

const Events = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("イベント")}</h1>
      <Search />
      <Sort />
      <Route exact path="/events" component={NewEvent} />
      <Route exact path="/events/:id" component={EventDetail} />
      <Route exact path="/events/:id/edit" component={EventEdit} />
      <Hidden smUp implementation="js">
        <EventCard />
      </Hidden>
      <Hidden xsDown implementation="js">
        <EventTable />
      </Hidden>
    </>
  );
};

export default Events;
