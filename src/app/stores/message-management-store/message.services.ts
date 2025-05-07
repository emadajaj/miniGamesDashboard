import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface MessageData {
  imageURL: string;
  game: string;
}


@Injectable({
  providedIn: 'root'
})
export class MessageService {



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


  MessagePageNumber(filter:any): Observable<any>{
  
    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.isActive) {
        params.isActive = filter.isActive;
      }
        this.http.get<any>(`https://extensions-test.challengex.app/api/template-message`, {
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

  Message(filter:any,pageNumber:number): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.isActive) {
        params.isActive = filter.isActive;
      }
        this.http.get<any>(`https://extensions-test.challengex.app/api/template-message?pageNumber=${pageNumber}`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.data.items;

          // Transform the items to match UserData structure
          const transformedData: MessageData[] = items.map((item: { id: any; imageURL: any;templateKey: any; isActive : any; message:any}) => ({
            id: item.id,
            imageURL: item.imageURL,
            templateKey: item.templateKey,
            isActive: item.isActive,
            message: item.message,
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

  editGamePrize(message: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put<any>("https://extensions-test.challengex.app/api/template-message", message, { headers });
  }


}
