import moment from "moment";

import { IEvent, ITag, IEventAPI, IEventQuery } from "../types";

/* eslint-disable camelcase */
/* eslint-disable new-cap */

export class Event implements IEvent {
  id = 0;
  created_by = "";
  stars = 0;
  attends = 0;
  attend: { avatar: string; url: string }[] = [];
  created_at = moment();
  updated_at = moment();
  general_tag: Tag[] = [];
  character_tag: Tag[] = [];
  organization_tag: Tag[] = [];
  name = "";
  start_datetime = moment().minute(0).second(0).millisecond(0);
  end_datetime = moment().minute(0).second(0).millisecond(0);
  timezone = moment.tz.guess();
  no_time = false;
  url = "";
  twitter_id = "";
  description = "";
  country = "109";
  state = "0";
  city = "0";
  place = "";
  google_map_description = "";
  google_map_place_id = "";
  attendees = 0;
  openness = 0;
  search_keywords = "";

  setDataByAPI(data: IEventAPI): Event {
    this.id = data.id;
    this.created_by = data.created_by;
    this.stars = data.stars;
    this.attends = data.attends;
    this.attend = data.attend;
    this.created_at = moment(data.created_at);
    this.updated_at = moment(data.updated_at);
    this.general_tag = data.general_tag;
    this.character_tag = data.character_tag;
    this.organization_tag = data.organization_tag;
    this.name = data.name;
    this.start_datetime = moment(data.start_datetime);
    this.end_datetime = moment(data.end_datetime);
    this.timezone = data.timezone;
    this.no_time = data.no_time;
    this.url = data.url;
    this.twitter_id = data.twitter_id;
    this.description = data.description;
    this.country = data.country;
    this.state = data.state;
    this.city = data.city;
    this.place = data.place;
    this.google_map_description = data.google_map_description;
    this.google_map_place_id = data.google_map_place_id;
    this.attendees = data.attendees;
    this.openness = data.openness;
    this.search_keywords = data.search_keywords;
    return this;
  }

  setDataByQuery(data: IEventQuery): Event {
    if (data.name) this.name = data.name;
    if (data.start_datetime) this.start_datetime = moment(data.start_datetime);
    if (data.end_datetime) this.end_datetime = moment(data.end_datetime);
    if (data.timezone) this.timezone = data.timezone;
    if (data.no_time) this.no_time = !!data.no_time;
    if (data.url) this.url = data.url;
    if (data.twitter_id) this.twitter_id = data.twitter_id;
    if (data.place) this.place = data.place;
    if (data.attendees) this.attendees = Number(data.attendees);
    return this;
  }
}

export class Tag implements ITag {
  id = 0;
  name = "";
}
