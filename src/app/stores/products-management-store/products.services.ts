import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface ProductData {
  id: number;
  title: string;
  price: number;
  imageURL: string;
  categoryId: string;
  country: string;
  isEnabled: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {



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


  ProductPageNumber(filter:any): Observable<any>{
  
    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.Id) {
        params.Id = filter.Id;  
      }
      if (filter.Title) {
        params.Title = filter.Title;
      }
      if (filter.country) {
        params.country = filter.country;
      }
      if (filter.CategoryId) {
        params.CategoryId = filter.CategoryId;
      }
      if (filter.maxScore) {
        params.maxScore = filter.maxScore;
    }
    if (filter.minScore) {
      params.minScore = filter.minScore;
    }
    if (filter.isEnabled) {
      params.isEnabled = filter.isEnabled;
    }
    if (filter.MinCreatedAt) {
      params.MinCreatedAt = filter.MinCreatedAt;
    }
    if (filter.MaxCreatedAt) {
      params.MaxCreatedAt = filter.MaxCreatedAt ;
    }
    

        this.http.get<any>(`https://extensions-test.challengex.app/api/store/products`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const totalPages = response.totalPages
          observer.next(totalPages)
          observer.complete();
          console.log(totalPages)
          }, error => {
        observer.error(error);
      });
    });
    
  }

  ProductsCards(filter:any,pageNumber:number): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.Id) {
        params.Id = filter.Id;  
      }
      if (filter.Title) {
        params.Title = filter.Title;
      }
      if (filter.country) {
        params.country = filter.country;
      }
      if (filter.CategoryId) {
        params.CategoryId = filter.CategoryId;
      }
      if (filter.maxScore) {
        params.maxScore = filter.maxScore;
    }
    if (filter.minScore) {
      params.minScore = filter.minScore;
    }
    if (filter.isEnabled) {
      params.isEnabled = filter.isEnabled;
    }
    if (filter.MinCreatedAt) {
      params.MinCreatedAt = filter.MinCreatedAt;
    }
    if (filter.MaxCreatedAt) {
      params.MaxCreatedAt = filter.MaxCreatedAt ;
    }
    
        this.http.get<any>(`https://extensions-test.challengex.app/api/store/products?pageNumber=${pageNumber}`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.items;

          // Transform the items to match UserData structure
          const transformedData: ProductData[] = items.map((item: { id: any; title: any; price: any; imageURL: any; country: any ; categoryId: any ; isEnabled : any}) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            imageURL: item.imageURL,
            categoryId: item.categoryId,
            country: item.country,
            isEnabled: item.isEnabled,
          }))

          observer.next(transformedData);
          observer.complete();


          }, error => {
        observer.error(error); // Handle errors
      });
    });
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
