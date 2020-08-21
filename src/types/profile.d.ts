/* eslint-disable camelcase */

export interface Profile {
  user: {
    id: number;
    username: string;
    url: string;
  };
  is_moderator: boolean;
  events_created: number;
  avatar: string;
  twitter_id: string;
  location: string;
  description: string;
  star: number[];
  attend: number[];
  following: number[];
}
