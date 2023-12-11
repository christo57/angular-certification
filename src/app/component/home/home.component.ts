import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { FootballService } from '../../service/football.service';
import { FootballApiService } from '../../service/api/football-api.service';
import { BehaviorSubject, map, mergeMap, Observable, of, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CountryEnum, isCountry } from '../../enum/country.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheUtilsService } from '../../service/utils/cache-utils.service';
import { LeagueApiResponseLeagueModel } from '../../model/league-api.model';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { StandingModel } from '../../model/standing-api.model';

export interface standingsData {
  standings: StandingModel[];
  league: LeagueApiResponseLeagueModel;
}

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
    RouterModule,
  ],
  providers: [FootballService, FootballApiService, CacheUtilsService],
})
export class HomeComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly footballService = inject(FootballService);
  private readonly year = new Date().getFullYear();

  public country!: CountryEnum;
  public countries = Object.values(CountryEnum);

  public countryChange$ = new BehaviorSubject<null>(null);

  public league$: Observable<LeagueApiResponseLeagueModel | null> =
    this.countryChange$.pipe(
      mergeMap(() =>
        this.footballService.getLeagueFromCountry(this.country, this.year)
      )
    );

  public data$: Observable<standingsData | null> = this.league$.pipe(
    mergeMap(league =>
      league
        ? this.footballService.getStandings(league.id, this.year).pipe(
            map(standings =>
              standings
                ? {
                    standings,
                    league,
                  }
                : null
            )
          )
        : of(null)
    )
  );

  public ngOnInit(): void {
    this.activatedRoute.queryParamMap
      .pipe(
        tap(queryParamMap => {
          const country = queryParamMap.get('country');
          this.country =
            country && isCountry(country)
              ? (country as CountryEnum)
              : CountryEnum.FRANCE;
        })
      )
      .subscribe();
  }

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
