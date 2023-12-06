import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { FootballService } from '../../service/football.service';
import { FootballApiService } from '../../service/api/football-api.service';
import { BehaviorSubject, mergeMap, Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CountryEnum } from '../../enum/country.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheUtilsService } from '../../service/utils/cache-utils.service';
import { LeagueApiResponseLeagueModel } from '../../model/league-api.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [FootballService, FootballApiService, CacheUtilsService],
})
export class HomeComponent {
  private readonly footballService = inject(FootballService);
  private readonly year = new Date().getFullYear();

  public country = CountryEnum.FRANCE;
  public countries = Object.values(CountryEnum);

  public countryChange$ = new BehaviorSubject<null>(null);
  public league$: Observable<LeagueApiResponseLeagueModel | null> =
    this.countryChange$.pipe(
      mergeMap(() =>
        this.footballService.getLeagueFromCountry(this.country, this.year)
      )
    );
  public standings$ = this.league$.pipe(
    mergeMap(league => {
      if (league) {
        return this.footballService.getStandings(league.id, this.year);
      } else {
        return of(null);
      }
    })
  );

  public displayedColumns: string[] = [
    'rank',
    'logo',
    'name',
    'games',
    'win',
    'lose',
    'draw',
    'goal-difference',
    'points',
  ];
}
