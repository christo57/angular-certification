import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FootballService } from '../../service/football.service';
import { FootballApiService } from '../../service/api/football-api.service';
import { BehaviorSubject, mergeMap, Observable} from 'rxjs';
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
}
