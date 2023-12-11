export interface StandingApiResponseModel {
  league: StandingApiResponseLeagueModel;
}

export interface StandingApiResponseLeagueModel {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  standings: StandingModel[][];
}

export interface StandingModel {
  rank: number;
  team: TeamModel;
  points: number;
  goalsDiff: number;
  group: string;
  all: AllModel;
}

export interface TeamModel {
  id: number;
  name: string;
  logo: string;
}

export interface AllModel {
  played: number;
  win: number;
  draw: number;
  lose: number;
}
