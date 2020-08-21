/* eslint-disable camelcase */

export interface Event {
  id: number;
  created_by: string;
  stars: number;
  attends: number;
  attend: {
    avatar: string;
    url: string;
  }[];
  general_tag: Tag[];
  character_tag: Tag[];
  organization_tag: Tag[];
  created_at: string;
  updated_at: string;
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

export interface Tag {
  id: number;
  name: string;
}
