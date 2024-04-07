interface IFairings {
  reused: boolean | null;
  recovery_attempt: boolean | null;
  recovered: boolean | null;
  ships: string[];
}

interface ILinks {
  patch: IPatch;
  reddit: IReddit;
  flickr: IFlickr;
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

interface IPatch {
  small: string;
  large: string;
}

interface IReddit {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

interface IFlickr {
  small: string[];
  original: string[];
}

interface IFailure {
  time: number;
  altitude: number | null;
  reason: string;
}

interface ICore {
  core: string;
  flight: number;
  gridfins: boolean;
  legs: boolean;
  reused: boolean;
  landing_attempt: boolean;
  landing_success: boolean | null;
  landing_type: string | null;
  landpad: string | null;
}

export interface ILaunch {
  fairings: IFairings | null;
  links: ILinks;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  net: boolean;
  window: number | null;
  rocket: string;
  success: boolean | null;
  failures: IFailure[];
  details: string | null;
  crew: string[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  flight_number: number;
  name: string;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  upcoming: boolean;
  cores: ICore[];
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
  id: string;
}

export interface IInterval {
  hours: string;
  minutes: string;
  seconds: string;
}
