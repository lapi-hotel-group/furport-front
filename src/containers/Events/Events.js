import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
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
import { AuthContext } from "../../auth/authContext";

const Events = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState(null);
  const [attends, setAttends] = useState(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.token) {
      const url = "/profiles/" + authContext.userId + "/";
      axios
        .get(url, {
          headers: {
            Authorization: "JWT " + authContext.token,
          },
        })
        .then((response) => {
          setStars(response.data.star);
          setAttends(response.data.attend);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [authContext.token, authContext.userId]);

  return (
    <>
      <h1>{t("イベント")}</h1>
      <Search />
      <Sort />
      {loading ? null : (
        <>
          <Route exact path="/events" component={NewEvent} />
          <Route
            exact
            path="/events/:id"
            render={(routeProps) => (
              <EventDetail
                stars={stars}
                setStars={setStars}
                attends={attends}
                setAttends={setAttends}
                {...routeProps}
              />
            )}
          />
          <Route exact path="/events/:id/edit" component={EventEdit} />
          <Hidden smUp implementation="js">
            <EventCard
              stars={stars}
              setStars={setStars}
              attends={attends}
              setAttends={setAttends}
            />
          </Hidden>
          <Hidden xsDown implementation="js">
            <EventTable
              stars={stars}
              setStars={setStars}
              attends={attends}
              setAttends={setAttends}
            />
          </Hidden>
        </>
      )}
    </>
  );
};

export default Events;
