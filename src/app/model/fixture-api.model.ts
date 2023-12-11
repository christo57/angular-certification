import { CountryEnum } from '../enum/country.enum';
import { LeagueEnum } from '../enum/league.enum';

export interface FixtureApiResponseModel {
  league: FixtureLeagueModel;
  goals: FixtureGoalModel;
  teams: FixtureTeamsModel;
}

export interface FixtureLeagueModel {
  id: number;
  name: LeagueEnum;
  country: CountryEnum;
  logo: string;
  flag: string;
  season: number;
}

export interface FixtureGoalModel {
  away: number;
  home: number;
}

export interface FixtureTeamsModel {
  away: FixtureTeamModel;
  home: FixtureTeamModel;
}

export interface FixtureTeamModel {
  id: number;
  logo: string;
  name: string;
  winner: boolean;
}
