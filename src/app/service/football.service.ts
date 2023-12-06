import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { FootballApiService } from './api/football-api.service';
import { LocalStorageKey } from '../enum/local-storage-key.enum';
import { CountryEnum } from '../enum/country.enum';
import {
  LeagueApiModel,
  LeagueApiResponseLeagueModel,
} from '../model/league-api.model';
import { FootballUtilsService } from './utils/football-utils.service';
import { CacheUtilsService } from './utils/cache-utils.service';
import { StandingApiModel, StandingModel } from '../model/standing-api.model';

@Injectable()
export class FootballService {
  private readonly footballApiService = inject(FootballApiService);
  private readonly cacheUtilsService = inject(CacheUtilsService);

  public getLeagueFromCountry(
    country: CountryEnum | undefined,
    year: number
  ): Observable<LeagueApiResponseLeagueModel | null> {
    const league = country && FootballUtilsService.countryToLeague.get(country);

    if (league) {
      const cacheKey = `${LocalStorageKey.LEAGUE}_${league}_${year}`;
      return this.cacheUtilsService
        .getCacheOrResult<LeagueApiModel | null>(
          cacheKey,
          this.footballApiService.getLeague(country, league, year)
        )
        .pipe(
          map(optLeagueApi => {
            if (optLeagueApi && optLeagueApi.response.length > 0) {
              return optLeagueApi.response[0].league;
            } else {
              console.error(`no result for league ${league}`);
              return null;
            }
          })
        );
    } else {
      console.error(
        `country ${country} does not exist or does not have a league associated`
      );
      return of(null);
    }
  }

  public getStandings(
    leagueId: number,
    year: number
  ): Observable<StandingModel[] | null> {
    const cacheKey = `${LocalStorageKey.STANDINGS}_${leagueId}_${year}`;
    return this.cacheUtilsService
      .getCacheOrResult<StandingApiModel | null>(
        cacheKey,
        this.footballApiService.getStandings(leagueId, year)
      )
      .pipe(
        map(optStandingApi => {
          if (optStandingApi && optStandingApi.response.length > 0) {
            return optStandingApi.response[0].league.standings[0];
          } else {
            return null;
          }
        })
      );
  }
}
