import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Typography, LinearProgress, Hidden } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Route, useLocation } from "react-router-dom";
import qs from "qs";
import csc from "../../utils/csc";

import Search from "../../components/Events/Search";
import Sort from "../../components/Events/Sort";
import { NewEvent } from "../../components/Events/NewEvent";
import EventDetail from "../../components/Events/EventDetail";
import EventEdit from "../../components/Events/EventEdit";
import EventTable from "../../components/Events/EventTable";
import EventCard from "../../components/Events/EventCard";
import { AuthContext } from "../../auth/authContext";

import { Event, Tag } from "../../models";
import { IEventAPI, IProfile } from "../../types";

const Events: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [generalTags, setGeneralTags] = useState<Tag[] | null>(null);
  const [organizationTags, setOrganizationTags] = useState<Tag[] | null>(null);
  const [characterTags, setCharacterTags] = useState<Tag[] | null>(null);
  const [search, setSearch] = useState(
    qs.parse(location.search.substr(1)).q?.toString()
  );
  const [generalTagsQuery, setGeneralTagsQuery] = useState<string[]>([]);
  const [organizationTagsQuery, setOrganizationTagsQuery] = useState<string[]>(
    []
  );
  const [characterTagsQuery, setCharacterTagsQuery] = useState<string[]>([]);
  const [sort, setSort] = useState("start_datetime");
  const [sortStartDatetime, setSortStartDatetime] = useState(
    new Date(2000, 0, 1)
  );
  const [sortEndDatetime, setSortEndDatetime] = useState(
    new Date(2030, 11, 31)
  );
  const [filterStared, setFilterStared] = useState(false);
  const [filterAttended, setFilterAttended] = useState(false);
  const [filterOld, setFilterOld] = useState(false);
  const [page, setPage] = useState(1);

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
      .get<{ results: IEventAPI[] }>(url)
      .then((response) => {
        const eventsData: Event[] = [];
        response.data.results.forEach((event) =>
          eventsData.push(new Event().setDataByAPI(event))
        );
        setEvents(eventsData);
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
    if (authContext.token) {
      const url = "/profiles/" + authContext.userId + "/";
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        })
        .then((response) => {
          setProfile(response.data);
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.detail);
          } else {
            setError(err.message);
          }
        });
    }
  }, [authContext.token, authContext.userId]);

  let sortedEvents: Event[] = [];
  if (events !== null && error === null) {
    sortedEvents = [...events];
    if (search)
      sortedEvents = sortedEvents.filter(
        (event) =>
          event.name.indexOf(search) > -1 ||
          t(csc.getCountryById(event.country.toString()).name).indexOf(search) >
            -1 ||
          t(csc.getStateById(event.state.toString()).name).indexOf(search) >
            -1 ||
          event.place.indexOf(search) > -1 ||
          event.google_map_description.indexOf(search) > -1
      );
    sortedEvents = sortedEvents.filter((event) =>
      event.start_datetime.isBefore(sortEndDatetime)
    );
    sortedEvents = sortedEvents.filter((event) =>
      event.end_datetime.isAfter(sortStartDatetime)
    );
    if (generalTagsQuery) {
      generalTagsQuery.forEach((tag) => {
        sortedEvents = sortedEvents.filter((event) =>
          event.general_tag.find((el) => el.name === tag)
        );
      });
    }
    if (organizationTagsQuery) {
      organizationTagsQuery.forEach((tag) => {
        sortedEvents = sortedEvents.filter((event) =>
          event.organization_tag.find((el) => el.name === tag)
        );
      });
    }
    if (characterTagsQuery) {
      characterTagsQuery.forEach((tag) => {
        sortedEvents = sortedEvents.filter((event) =>
          event.character_tag.find((el) => el.name === tag)
        );
      });
    }
    if (filterStared && profile !== null) {
      if (profile.star.length) {
        sortedEvents = sortedEvents.filter((event) =>
          profile.star
            .map((el) => el === event.id)
            .reduce((prev, current) => prev || current)
        );
      } else {
        sortedEvents = [];
      }
    }
    if (filterAttended && profile !== null) {
      if (profile.attend.length) {
        sortedEvents = sortedEvents.filter((event) =>
          profile.attend
            .map((el) => el === event.id)
            .reduce((prev, current) => prev || current)
        );
      } else {
        sortedEvents = [];
      }
    }
    if (!filterOld)
      sortedEvents = sortedEvents.filter((event) =>
        event.end_datetime.isAfter()
      );
    switch (sort) {
      case "-start_datetime":
        sortedEvents.sort(
          (a, b) => b.start_datetime.valueOf() - a.start_datetime.valueOf()
        );
        break;
      case "start_datetime":
        sortedEvents.sort(
          (a, b) => a.start_datetime.valueOf() - b.start_datetime.valueOf()
        );
        break;
      case "-stars":
        sortedEvents.sort((a, b) => b.stars - a.stars);
        break;
      case "-attends":
        sortedEvents.sort((a, b) => b.attends - a.attends);
        break;
      default:
        sortedEvents.sort(
          (a, b) => b.start_datetime.valueOf() - a.start_datetime.valueOf()
        );
        break;
    }
  }

  useEffect(() => {
    setPage(1);
  }, [
    search,
    generalTagsQuery,
    organizationTagsQuery,
    characterTagsQuery,
    filterAttended,
    filterStared,
    filterOld,
    sort,
  ]);

  return (
    <>
      <h1>{t("containers.events.title")}</h1>
      {events === null ||
      (authContext.token && profile === null) ||
      generalTags === null ||
      organizationTags === null ||
      characterTags === null ||
      error ? (
        <>{error ? <Typography>{error}</Typography> : <LinearProgress />}</>
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />
          <Sort
            authenticated={authContext.token !== null}
            sort={sort}
            setSort={setSort}
            sortStartDatetime={sortStartDatetime}
            setSortStartDatetime={setSortStartDatetime}
            sortEndDatetime={sortEndDatetime}
            setSortEndDatetime={setSortEndDatetime}
            filterStared={filterStared}
            setFilterStared={setFilterStared}
            filterAttended={filterAttended}
            setFilterAttended={setFilterAttended}
            filterOld={filterOld}
            setFilterOld={setFilterOld}
            generalTags={generalTags}
            organizationTags={organizationTags}
            characterTags={characterTags}
            organizationTagsQuery={organizationTagsQuery}
            setOrganizationTagsQuery={setOrganizationTagsQuery}
            characterTagsQuery={characterTagsQuery}
            setCharacterTagsQuery={setCharacterTagsQuery}
            generalTagsQuery={generalTagsQuery}
            setGeneralTagsQuery={setGeneralTagsQuery}
          />

          <Route
            exact
            path="/events/new"
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
            path="/events/:id(\d+)"
            render={() => (
              <EventDetail
                events={events}
                setEvents={setEvents}
                profile={profile}
                setProfile={setProfile}
                organizationTagsQuery={organizationTagsQuery}
                setOrganizationTagsQuery={setOrganizationTagsQuery}
                characterTagsQuery={characterTagsQuery}
                setCharacterTagsQuery={setCharacterTagsQuery}
                generalTagsQuery={generalTagsQuery}
                setGeneralTagsQuery={setGeneralTagsQuery}
                dashboard={false}
              />
            )}
          />
          <Route
            exact
            path="/events/:id(\d+)/edit"
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
              profile={profile}
              setProfile={setProfile}
              page={page}
              setPage={setPage}
              setShowId={() => {}} // eslint-disable-line @typescript-eslint/no-empty-function
              dashboard={false}
              user={false}
            />
          </Hidden>
          <Hidden xsDown implementation="js">
            <EventTable
              events={events}
              setEvents={setEvents}
              sortedEvents={sortedEvents}
              profile={profile}
              setProfile={setProfile}
              page={page}
              setPage={setPage}
              generalTagsQuery={generalTagsQuery}
              setGeneralTagsQuery={setGeneralTagsQuery}
            />
          </Hidden>
        </>
      )}
    </>
  );
};

export default Events;
