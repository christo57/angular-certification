export interface LeagueApiResponseModel {
  country: LeagueApiResponseCountryModel;
  league: LeagueApiResponseLeagueModel;
}

export interface LeagueApiResponseCountryModel {
  code: string;
  flag: string;
  name: string;
}

export interface LeagueApiResponseLeagueModel {
  id: number;
  logo: string;
  name: string;
  type: string;
}
