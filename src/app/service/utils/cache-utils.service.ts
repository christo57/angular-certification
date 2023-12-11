import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheUtilsService {
  private readonly document = inject(DOCUMENT);

  public getCacheOrResult<T>(
    key: string,
    result: Observable<T>
  ): Observable<T> {
    const localStorage = this.document.defaultView?.localStorage;

    const cacheLeagueResult = localStorage?.getItem(key);
    if (cacheLeagueResult) {
      console.log(`get res ${key} from cache`);
      return of(JSON.parse(cacheLeagueResult) as T);
    } else {
      console.log('get res from api service');
      return result.pipe(
        tap(result => localStorage?.setItem(key, JSON.stringify(result)))
      );
    }
  }
}
