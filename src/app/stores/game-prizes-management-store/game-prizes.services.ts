import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  productName: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface GamePrizesData {
  imageURL: string;
  game: string;
}


@Injectable({
  providedIn: 'root'
})
export class GamePrizesService {



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


  GamePrizesPageNumber(filter:any): Observable<any>{
  
    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
        if (filter.MinRequiredScore) {
          params.MinRequiredScore = filter.MinRequiredScore;
        }
        if (filter.MaxRequiredScore) {
          params.MaxRequiredScore = filter.MaxRequiredScore;
        }
        if (filter.MinNormal_LC_Prize) {
          params.MinNormal_LC_Prize = filter.MinNormal_LC_Prize;
        }
        if (filter.MaxNormal_LC_Prize) {
          params.MaxNormal_LC_Prize = filter.MaxNormal_LC_Prize;
        }

    

        this.http.get<any>(`https://extensions-test.challengex.app/api/game-prize`, {
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

  GamePrizes(filter:any,pageNumber:number): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.MinRequiredScore) {
        params.MinRequiredScore = filter.MinRequiredScore;
      }
      if (filter.MaxRequiredScore) {
        params.MaxRequiredScore = filter.MaxRequiredScore;
      }
      if (filter.MinNormal_LC_Prize) {
        params.MinNormal_LC_Prize = filter.MinNormal_LC_Prize;
      }
      if (filter.MaxNormal_LC_Prize) {
        params.MaxNormal_LC_Prize = filter.MaxNormal_LC_Prize;
      }
    
        this.http.get<any>(`https://extensions-test.challengex.app/api/game-prize?pageNumber=${pageNumber}`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.data.items;

          // Transform the items to match UserData structure
          const transformedData: GamePrizesData[] = items.map((item: { id: any; imageURL: any;game: any;}) => ({
            id: item.id,
            imageURL: item.imageURL,
            game: item.game,
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

  editGamePrize(mile_stone: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put<any>("https://extensions-test.challengex.app/api/game-prize", mile_stone, { headers });
  }


}
