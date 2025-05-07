import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface ProductsSerialsData {
  productId: string;
  productName: string;
  ownerId: string;
  ownerName: string;
  code: string;
  serialNumber: string;
  validTo: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsSerialsService {
  constructor(private http: HttpClient) {}

  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('authToken');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  ProductsSerialsPageNumber(filter: any): Observable<number> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/store/products-serials`, {
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

  ProductsSerials(filter: any, pageNumber: number): Observable<ProductsSerialsData[]> {
    return new Observable(observer => {
      const params: any = { ...filter };

      this.http.get<any>(`https://extensions-test.challengex.app/api/store/products-serials?pageNumber=${pageNumber}`, {
        headers: this.createHeaders(),
        params: params
      }).subscribe(response => {
          const items = response.items;

          const transformedData: ProductsSerialsData[] = items.map((item: { productId: any; product: { title: any; }; ownerId: any; owner: { name: any; }; code: any; serialNumber: any; validTo: any; }) => ({
            productId: item.productId,
            productName: item.product.title,
            ownerId: item.ownerId,
            ownerName: item.owner.name, // Extracting owner's name
            code: item.code,
            serialNumber: item.serialNumber,
            validTo: item.validTo,
          }));

          observer.next(transformedData);
          observer.complete();
        }, error => {
          observer.error(error);
        });
    });
  }
}