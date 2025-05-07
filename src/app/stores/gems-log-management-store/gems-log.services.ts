import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface GemsLogData {
  userId: string;
  userName: string;
  transaction: string;
  valueBefore: number;
  valueAfter: number;
  senderID: string;
  description: string;
  changedAmount: number;
  operationTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class GemsLogService {
  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  GemsLogPageNumber(filter: any): Observable<number> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/games-users/gems-logs`, {
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

  GemsLog(filter: any, pageNumber: number): Observable<GemsLogData[]> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/games-users/gems-logs?pageNumber=${pageNumber}`, {
        headers: this.createHeaders(),
        params: params
      }).subscribe(response => {
          const items = response.data.items;

          const transformedData: GemsLogData[] = items.map((item: { user: { name: any; id:any }; transaction: any; valueAfter: any; valueBefore: any;  senderId:any; description:any; operationTime: any; changedAmount: any;}) => ({
            userId: item.user.id,
            userName: item.user.name,
            transaction: item.transaction,
            valueBefore: item.valueBefore,
            valueAfter: item.valueAfter,
            senderId: item.senderId,
            description: item.description,
            changedAmount: item.changedAmount,
            operationTime: item.operationTime,
          }));

          observer.next(transformedData);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }
}