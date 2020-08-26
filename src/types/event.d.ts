/* eslint-disable camelcase */

import moment from "moment";

export interface IWritableEvent {
  general_tag: ITag[];
  character_tag: ITag[];
  organization_tag: ITag[];
  name: string;
  start_datetime: moment.Moment;
  end_datetime: moment.Moment;
  timezone: string;
  no_time: boolean;
  url: string;
  twitter_id: string;
  description: string;
  country: string;
  state: string;
  place: string;
  google_map_description: string;
  google_map_place_id: string;
  attendees: number;
  openness: number;
  search_keywords: string;
}

export interface IEvent extends IWritableEvent {
  id: number;
  created_by: string;
  stars: number;
  attends: number;
  attend: {
    avatar: string;
    url: string;
  }[];
  created_at: moment.Moment;
  updated_at: moment.Moment;
}

export interface ITag {
  id: number;
  name: string;
}

export interface IEventAPI {
  id: number;
  created_by: string;
  stars: number;
  attends: number;
  attend: {
    avatar: string;
    url: string;
  }[];
  created_at: string;
  updated_at: string;
  general_tag: ITag[];
  character_tag: ITag[];
  organization_tag: ITag[];
  name: string;
  start_datetime: string;
  end_datetime: string;
  timezone: string;
  no_time: boolean;
  url: string;
  twitter_id: string;
  description: string;
  country: string;
  state: string;
  city: string;
  place: string;
  google_map_description: string;
  google_map_place_id: string;
  attendees: number;
  openness: number;
  search_keywords: string;
}

export interface IEventQuery {
  name?: string;
  start_datetime?: string;
  end_datetime?: string;
  timezone?: string;
  no_time?: string;
  url?: string;
  place?: string;
  attendees?: string;
  twitter_id?: string;
}
