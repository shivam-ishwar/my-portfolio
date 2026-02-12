import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type Portfolio = any;

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  readonly data$: Observable<Portfolio>;

  constructor(private http: HttpClient) {
    this.data$ = this.http
      .get<Portfolio>('assets/portfolio.json')
      .pipe(shareReplay({ bufferSize: 1, refCount: true }));
  }
}