import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface PhoneNumber {
  id: number;
  phoneNumber: string;
  status: 'active' | 'inactive';
  messageCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class NumberService {
  private apiUrl = 'https://quackr.free.beeceptor.com/numbers';

  constructor(private http: HttpClient) {}

  getNumbers(): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching numbers:', error);
        return throwError(() => error);
      })
    );
  }

  updateNumberStatus(id: number, status: 'active' | 'inactive'): Observable<PhoneNumber> {
    return throwError(() => new Error('Cannot update external API'));
  }

  isAuthenticated(): boolean {
    return true;
  }

  logout(): void {
  }
}
