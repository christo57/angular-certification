import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { map, mergeMap, of, take, tap } from 'rxjs';
import { FootballService } from '../../service/football.service';
import { FootballApiService } from '../../service/api/football-api.service';
import { HttpClientModule } from '@angular/common/http';
import { CacheUtilsService } from '../../service/utils/cache-utils.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterModule,
    CommonModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [FootballService, FootballApiService, CacheUtilsService],
})
export class TeamComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly footballService = inject(FootballService);

  private readonly year = new Date().getFullYear();
  private readonly lastGames = 10;

  public fixtures$ = this.activatedRoute.paramMap.pipe(
    mergeMap(paramMap => {
      const leagueId = paramMap.get('leagueId');
      const teamId = paramMap.get('teamId');
      if (leagueId && teamId) {
        return this.footballService.getFixtures(
          Number(leagueId),
          Number(teamId),
          this.year,
          this.lastGames
        );
      } else {
        return of(null);
      }
    }),
    tap(res => {
      if (!res) {
        this.back();
      }
    })
  );

  public back(): void {
    this.activatedRoute.paramMap
      .pipe(
        take(1),
        mergeMap(paramMap => {
          const leagueId = paramMap.get('leagueId');
          if (leagueId) {
            return this.footballService.getCountry(Number(leagueId)).pipe(
              map(country =>
                this.router.navigate([''], {
                  queryParams: { country: country?.toLowerCase() },
                })
              )
            );
          } else {
            return this.router.navigate(['']);
          }
        })
      )
      .subscribe();
  }
}
