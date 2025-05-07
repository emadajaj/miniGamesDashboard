import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface OrdersData {
  userId: string;
  userName: string;
  productId: string;
  productName: string;
  productPrice: number;
  orderPrice: number;
  referenceId: string;
  quantity: number;
  message: string;
  requestedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  OrdersPageNumber(filter: any): Observable<number> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/store/like-card-orders`, {
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

  Orders(filter: any, pageNumber: number): Observable<OrdersData[]> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/store/like-card-orders?pageNumber=${pageNumber}`, {
        headers: this.createHeaders(),
        params: params
      }).subscribe(response => {
          const items = response.items;

          const transformedData: OrdersData[] = items.map((item: { userId: any; user: { name: any; }; productId: any; product: { title: any; price:any}; orderPrice: any; referenceId: any;  quantity:any; message:any; requestedAt: any; }) => ({
            userId: item.userId,
            userName: item.user.name,
            productId: item.productId,
            productName: item.product.title,
            productPrice: item.product.price,
            orderPrice: item.orderPrice,
            referenceId: item.referenceId,
            quantity: item.quantity,
            message: item.message,
            requestedAt: item.requestedAt,
          }));

          observer.next(transformedData);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }
}