import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { CountryEnum } from '../../enum/country.enum';
import { LeagueEnum } from '../../enum/league.enum';
import { FootballApiModel } from '../../model/football-api.model';
import { LeagueApiResponseModel } from '../../model/league-api.model';
import { StandingApiResponseModel } from '../../model/standing-api.model';
import { FixtureApiResponseModel } from '../../model/fixture-api.model';
@Injectable()
export class FootballApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'https://v3.football.api-sports.io';
  private readonly key = '0b3c48908191cf4192f9ab4c309d7095';

  public getLeague(
    countryName: CountryEnum,
    leagueName: LeagueEnum,
    year: number
  ): Observable<FootballApiModel<LeagueApiResponseModel> | null> {
    const finalUrl = `${this.url}/leagues`;
    return this.getFootballApi(
      finalUrl,
      new HttpParams().appendAll({
        name: leagueName,
        country: countryName,
        season: year,
        current: true,
        type: 'League',
      })
    );
  }

  public getStandings(
    leagueId: number,
    year: number
  ): Observable<FootballApiModel<StandingApiResponseModel> | null> {
    const finalUrl = `${this.url}/standings`;
    return this.getFootballApi(
      finalUrl,
      new HttpParams().appendAll({ league: leagueId, season: year })
    );
  }

  public getFixtures(
    leagueId: number,
    teamId: number,
    year: number,
    lastGames: number
  ): Observable<FootballApiModel<FixtureApiResponseModel> | null> {
    const finalUrl = `${this.url}/fixtures`;
    return this.getFootballApi(
      finalUrl,
      new HttpParams().appendAll({
        league: leagueId,
        season: year,
        team: teamId,
        last: lastGames,
      })
    );
  }

  public getCountry(
    leagueId: number
  ): Observable<FootballApiModel<unknown> | null> {
    const finalUrl = `${this.url}/???`;
    return this.getFootballApi(
      finalUrl,
      new HttpParams().appendAll({
        league: leagueId,
      })
    );
  }

  private getFootballApi<T>(
    url: string,
    params: HttpParams
  ): Observable<FootballApiModel<T> | null> {
    return this.httpClient
      .get<FootballApiModel<T>>(url, {
        headers: { 'x-rapidapi-key': this.key },
        params,
      })
      .pipe(
        map(res => {
          if (res.errors.length === 0) {
            return res;
          } else {
            console.error(res.errors.join(' - '));
            return null;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          console.error(`error when calling ${url} : ${err.message}`);
          return of(null);
        })
      );
  }
}
