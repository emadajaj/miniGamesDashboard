import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface GameUsersLogData {
  id: string;
  userId: string;
  name: string;
  country: string;
  code: string;
  score: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class GamesUsersLogService {
  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  GamesUsersLogPageNumber(filter: any): Observable<number> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api//unlocky-games-logs`, {
        headers: this.createHeaders(),
        params: params
      }).subscribe(response => {
          observer.next(response.data.totalPages);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }
  
  GamesUsersLog(filter: any, pageNumber: number): Observable<GameUsersLogData[]> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api//unlocky-games-logs?pageNumber=${pageNumber}`, {
        headers: this.createHeaders(),
        params: params
      }).subscribe(response => {
          const items = response.data.items;

          const transformedData: GameUsersLogData[] = items.map((item: { id:any ;   userId:any ; name: any; country: any; score: any; created: any; }) => ({
            id: item.id,
            userId: item.userId,
            name: item.name,
            country: item.country, // Extracting owner's name
            score: item.score,
            created: item.created,
          }));

          observer.next(transformedData);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }
}