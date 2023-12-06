import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FootballService } from '../../service/football.service';
import { FootballApiService } from '../../service/api/football-api.service';
import { tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { CountryEnum } from '../../enum/country.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CacheUtilsService } from '../../service/utils/cache-utils.service';

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
  public country?: CountryEnum;
  public countries = Object.values(CountryEnum);

  public getLeague(): void {
    const year = new Date().getFullYear();
    this.footballService
      .getLeagueFromCountry(this.country, year)
      .pipe(
        tap(optLeague => {
          console.log('getLeagueFromCountry : ', optLeague);

          if (optLeague) {
            console.log('league : ', optLeague);
          }
        })
      )
      .subscribe();
  }
}
