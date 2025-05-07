import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface LikeCardsTransactionsData {
  userId: string;
  userName: string;
  deductionAmount: string;
  game: string;
  transactionType: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class LikeCardsTransactionsService {
  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  LikeCardsTransactionsPageNumber(filter: any): Observable<number> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/like-cards-transactions`, {
        headers: this.createHeaders(),
        params: params
      }).subscribe(response => {
          observer.next(response.totalPages);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }

  LikeCardsTransactions(filter: any, pageNumber: number): Observable<LikeCardsTransactionsData[]> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/like-cards-transactions?pageNumber=${pageNumber}`, {
        headers: this.createHeaders(),
        params: params
      }).subscribe(response => {
          const items = response.items;

          const transformedData: LikeCardsTransactionsData[] = items.map((item: { userId: any; user: { name: any; }; deductionAmount: any; game: any; transactionType: any; created: any; }) => ({
            userId: item.userId,
            userName: item.user.name,
            deductionAmount: item.deductionAmount,
            game: item.game,
            transactionType: item.transactionType,
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