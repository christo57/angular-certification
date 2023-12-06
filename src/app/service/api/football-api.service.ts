import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CountryEnum } from '../../enum/country.enum';
import { LeagueEnum } from '../../enum/league.enum';
import { LeagueApiModel } from '../../model/league-api.model';
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
    return this.httpClient
      .get<LeagueApiModel>(finalUrl, {
        headers: { 'x-rapidapi-key': this.key },
        params: {
          name: leagueName,
          country: countryName,
          season: year,
          current: true,
          type: 'League',
        },
      })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.error(`error when calling ${finalUrl} : ${err.message}`);
          return of(null);
        })
      );
  }
}
