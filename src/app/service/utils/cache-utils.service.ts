import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheUtilsService {
  public getCacheOrResult<T>(
    key: string,
    result: Observable<T>
  ): Observable<T> {
    const cacheLeagueResult = localStorage.getItem(key);
    if (cacheLeagueResult) {
      console.log(`get res ${key} from cache`);
      return of(JSON.parse(cacheLeagueResult) as T);
    } else {
      console.log('get res from api service');
      return result.pipe(
        tap(result => localStorage.setItem(key, JSON.stringify(result)))
      );
    }
  }
}
