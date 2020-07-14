import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Route } from "react-router-dom";
import Hidden from "@material-ui/core/Hidden";
import LinearProgress from "@material-ui/core/LinearProgress";
import csc from "country-state-city";
import queryString from "query-string";

import Search from "../../components/Events/Search";
import Sort from "../../components/Events/Sort";
import NewEvent from "../../components/Events/NewEvent";
import EventDetail from "../../components/Events/EventDetail";
import EventEdit from "../../components/Events/EventEdit";
import EventTable from "../../components/Events/EventTable";
import EventCard from "../../components/Events/EventCard";
import { AuthContext } from "../../auth/authContext";
import { Typography } from "@material-ui/core";

const Events = (props) => {
  const { t } = useTranslation();
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState(null);
  const [stars, setStars] = useState(null);
  const [isModerator, setIsModerator] = useState(false);
  const [attends, setAttends] = useState(null);
  const [generalTags, setGeneralTags] = useState(null);
  const [organizationTags, setOrganizationTags] = useState(null);
  const [characterTags, setCharacterTags] = useState(null);

  const [search, setSearch] = useState(
    queryString.parse(props.location.search).q
  );
  const [sort, setSort] = useState("dateTime_down");
  const [filterStared, setFilterStared] = useState(false);
  const [filterAttended, setFilterAttended] = useState(false);
  const [filterOld, setFilterOld] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const url = "/general_tags/";
    axios
      .get(url)
      .then((response) => {
        setGeneralTags(response.data.results);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, []);

  useEffect(() => {
    const url = "/organization_tags/";
    axios
      .get(url)
      .then((response) => {
        setOrganizationTags(response.data.results);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, []);

  useEffect(() => {
    const url = "/character_tags/";
    axios
      .get(url)
      .then((response) => {
        setCharacterTags(response.data.results);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
      });
  }, []);

  useEffect(() => {
    const url = "/events/";
    axios
      .get(url)
      .then((response) => {
        setEvents(response.data.results);
        setLoadingEvents(false);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.detail);
        } else {
          setError(err.message);
        }
        setLoadingEvents(false);
      });
  }, []);

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
          setIsModerator(response.data.is_moderator);
          setLoadingProfiles(false);
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.detail);
          } else {
            setError(err.message);
          }
          setLoadingProfiles(false);
        });
    } else {
      setLoadingProfiles(false);
    }
  }, [authContext.token, authContext.userId]);

  let sortedEvents;
  if (!loadingEvents && !error) {
    sortedEvents = [...events];
    if (search)
      sortedEvents = sortedEvents.filter(
        (event) =>
          event.name.indexOf(search) > -1 ||
          t(csc.getCountryById(event.country.toString()).name).indexOf(search) >
            -1 ||
          t(csc.getStateById(event.state.toString()).name).indexOf(search) >
            -1 ||
          t(csc.getStateById(event.city.toString()).name).indexOf(search) >
            -1 ||
          event.place.indexOf(search) > -1 ||
          event.google_map_description.indexOf(search) > -1
      );
    if (filterStared) {
      if (stars.length) {
        sortedEvents = sortedEvents.filter((event) =>
          stars
            .map((el) => el === event.id)
            .reduce((prev, current) => prev + current)
        );
      } else {
        sortedEvents = [];
      }
    }
    if (filterAttended) {
      if (attends.length) {
        sortedEvents = sortedEvents.filter((event) =>
          attends
            .map((el) => el === event.id)
            .reduce((prev, current) => prev + current)
        );
      } else {
        sortedEvents = [];
      }
    }
    if (!filterOld)
      sortedEvents = sortedEvents.filter(
        (event) => new Date(event.end_datetime).getTime() > new Date().getTime()
      );
    switch (sort) {
      case "dateTime_down":
        sortedEvents.sort(
          (a, b) =>
            new Date(b.start_datetime).getTime() -
            new Date(a.start_datetime).getTime()
        );
        break;
      case "dateTime_up":
        sortedEvents.sort(
          (a, b) =>
            new Date(a.start_datetime).getTime() -
            new Date(b.start_datetime).getTime()
        );
        break;
      case "stars":
        sortedEvents.sort((a, b) => b.stars - a.stars);
        break;
      case "attends":
        sortedEvents.sort((a, b) => b.attends - a.attends);
        break;
      default:
        sortedEvents.sort(
          (a, b) =>
            new Date(b.start_datetime).getTime() -
            new Date(a.start_datetime).getTime()
        );
        break;
    }
  }

  return (
    <>
      <h1>{t("イベント")}</h1>
      <Search search={search} setSearch={setSearch} />
      <Sort
        authenticated={authContext.token !== null}
        sort={sort}
        setSort={setSort}
        filterStared={filterStared}
        setFilterStared={setFilterStared}
        filterAttended={filterAttended}
        setFilterAttended={setFilterAttended}
        filterOld={filterOld}
        setFilterOld={setFilterOld}
      />
      {loadingEvents ||
      loadingProfiles ||
      generalTags === null ||
      organizationTags === null ||
      characterTags === null ||
      error ? (
        <>{error ? <Typography>{error}</Typography> : <LinearProgress />}</>
      ) : (
        <>
          <Route
            exact
            path="/events"
            render={(routeProps) => (
              <NewEvent
                events={events}
                setEvents={setEvents}
                generalTags={generalTags}
                organizationTags={organizationTags}
                characterTags={characterTags}
                setGeneralTags={setGeneralTags}
                setOrganizationTags={setOrganizationTags}
                setCharacterTags={setCharacterTags}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/events/:id"
            render={(routeProps) => (
              <EventDetail
                events={events}
                setEvents={setEvents}
                stars={stars}
                setStars={setStars}
                attends={attends}
                setAttends={setAttends}
                isModerator={isModerator}
                {...routeProps}
              />
            )}
          />
          <Route
            exact
            path="/events/:id/edit"
            render={(routeProps) => (
              <EventEdit
                events={events}
                setEvents={setEvents}
                generalTags={generalTags}
                organizationTags={organizationTags}
                characterTags={characterTags}
                setGeneralTags={setGeneralTags}
                setOrganizationTags={setOrganizationTags}
                setCharacterTags={setCharacterTags}
                {...routeProps}
              />
            )}
          />
          <Hidden smUp implementation="js">
            <EventCard
              events={events}
              setEvents={setEvents}
              sortedEvents={sortedEvents}
              stars={stars}
              setStars={setStars}
              attends={attends}
              setAttends={setAttends}
            />
          </Hidden>
          <Hidden xsDown implementation="js">
            <EventTable
              events={events}
              setEvents={setEvents}
              sortedEvents={sortedEvents}
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
