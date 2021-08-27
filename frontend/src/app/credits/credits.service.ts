import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface CreditsSummary {
  total: number;
  current: number;
}

@Injectable({
  providedIn: 'root',
})
export class CreditsService {
  constructor(private readonly http: HttpClient) {}

  getSummary(): Observable<CreditsSummary> {
    return this.http.get<CreditsSummary>(
      `${environment.backend.url}/credits/summary`
    );
  }
}
