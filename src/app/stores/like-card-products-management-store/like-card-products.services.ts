import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface LikeCardData {
  productId: number;
  productName: string;
  productPrice: number;
  productCurrency: number;
  productImage: string;
  categoryId: string;
  available: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LikeCardsService {



  constructor(private http: HttpClient) {}


  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    // If token exists, set it in the headers
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


  fetchLikeCardsPageNumber(filter:any): Observable<any>{
  
    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.productId) {
        params.productId = filter.productId;  
      }
      if (filter.productName) {
        params.productName = filter.productName;
      }
      if (filter.country) {
        params.country = filter.country;
      }
      if (filter.maxScore) {
        params.maxScore = filter.maxScore;
    }
    if (filter.minScore) {
      params.minScore = filter.minScore;
    }
    if (filter.MinCreatedAt) {
      params.MinCreatedAt = filter.MinCreatedAt;
    }
    if (filter.MaxCreatedAt) {
      params.MaxCreatedAt = filter.MaxCreatedAt ;
    }

        this.http.get<any>(`https://extensions-test.challengex.app/api/store/products/like-cards`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const totalPages = response.data.totalPages
          observer.next(totalPages)
          observer.complete();
          console.log(totalPages)
          }, error => {
        observer.error(error);
      });
    });
    
  }

  fetchLikeCards(filter:any,pageNumber:number): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
    if (filter.productId) {
        params.productId = filter.productId;
    }
    if (filter.productName) {
      params.productName = filter.productName;
    }
    if (filter.country) {
      params.country = filter.country;
    }
      if (filter.maxScore) {
        params.maxScore = filter.maxScore;
    }
    if (filter.minScore) {
      params.minScore = filter.minScore;
    }
    if (filter.MinCreatedAt) {
      params.MinCreatedAt = filter.MinCreatedAt;
    }
    if (filter.MaxCreatedAt) {
      params.MaxCreatedAt = filter.MaxCreatedAt ;
    }
    
        this.http.get<any>(`https://extensions-test.challengex.app/api/store/products/like-cards`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.data;

          // Transform the items to match UserData structure
          const transformedData: LikeCardData[] = items.map((item: { productId: any; productName: any; productPrice: any; productCurrency: any; productImage: any; categoryId: any ; available : any}) => ({
            productId: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            productImage: item.productImage,
            productCurrency: item.productCurrency,
            categoryId: item.categoryId,
            available: item.available,
          }))

          observer.next(transformedData);
          observer.complete();


          }, error => {
        observer.error(error); // Handle errors
      });
    });
  }

  addProduct(productData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post("https://extensions-test.challengex.app/api/store/products", productData, { headers });
  }
  
  // getProduct(id: number): Observable<any> {
  //   const headers = this.createHeaders();
  //   return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  // }

  editProduct(product: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put<any>("https://extensions-test.challengex.app/api/store/products", product, { headers });
  }


}
