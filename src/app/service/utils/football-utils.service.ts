import { Injectable } from '@angular/core';
import { CountryEnum } from '../../enum/country.enum';
import { LeagueEnum } from '../../enum/league.enum';

@Injectable()
export class FootballUtilsService {
  public static countryToLeague = new Map<CountryEnum, LeagueEnum>([
    [CountryEnum.ENGLAND, LeagueEnum.PREMIER_LEAGUE],
    [CountryEnum.SPAIN, LeagueEnum.LIGA],
    [CountryEnum.FRANCE, LeagueEnum.LIGUE1],
    [CountryEnum.GERMANY, LeagueEnum.BUNDESLIGA],
    [CountryEnum.ITALY, LeagueEnum.SERIEA],
  ]);
}
