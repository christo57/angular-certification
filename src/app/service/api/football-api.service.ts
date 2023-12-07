import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CountryEnum } from '../../enum/country.enum';
import { LeagueEnum } from '../../enum/league.enum';
import { LeagueApiModel } from '../../model/league-api.model';
import { StandingApiModel } from '../../model/standing-api.model';
import { FixtureApiModel } from '../../model/fixture-api.model';
@Injectable()
export class FootballApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly url = 'https://v3.football.api-sports.io';
  private readonly key = '0652d7506d30e0ab13ced3aae4378d75';

  public getLeague(
    countryName: CountryEnum,
    leagueName: LeagueEnum,
    year: number
  ): Observable<LeagueApiModel | null> {
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
  ): Observable<StandingApiModel | null> {
    const finalUrl = `${this.url}/standings`;
    return this.getFootballApi<StandingApiModel>(
      finalUrl,
      new HttpParams().appendAll({ league: leagueId, season: year })
    );
  }

  public getFixtures(
    leagueId: number,
    teamId: number,
    year: number,
    lastGames: number
  ): Observable<FixtureApiModel | null> {
    const finalUrl = `${this.url}/fixtures`;
    return this.getFootballApi<FixtureApiModel>(
      finalUrl,
      new HttpParams().appendAll({
        league: leagueId,
        season: year,
        team: teamId,
        last: lastGames,
      })
    );
  }

  private getFootballApi<T>(
    url: string,
    params: HttpParams
  ): Observable<T | null> {
    return this.httpClient
      .get<T>(url, {
        headers: { 'x-rapidapi-key': this.key },
        params,
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error(`error when calling ${url} : ${err.message}`);
          return of(null);
        })
      );
  }
}
