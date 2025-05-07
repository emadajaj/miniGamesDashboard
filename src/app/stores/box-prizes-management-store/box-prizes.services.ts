import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'button' | 'image';
}

export interface BoxPrizesData {
  id: number;
  userId: string;
  userName: string;
  gameType: string;
  prizeClass: string;
  type: string;
  isSuccess: boolean;
  message: number;
  prizeValue: number;
  created: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BoxPrizesService {


  constructor(private http: HttpClient) {}



  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjcyZTUzMS0xZDc2LTQ0MjQtYWRkOC05NGUxNTliOGJjOTUiLCJzdWIiOiIyN2Q5ZWI4Ny04NWVhLWRmNjgtZjQzZS0yYjU4MTE3MTVlZjEiLCJpc3MiOiJodHRwczovL2NoYWxsZW5nZXhhcGkubGlrZTRhcHAuY29tLyIsInNlc3Npb24iOiJjMzRlYTI3Iiwicm9sZSI6WyJTVVBFUl9BRE1JTiIsIkFETUlOIl0sIm5iZiI6MTc0MjQ1NjI5NCwiZXhwIjoxNzQyNDU5ODk0LCJpYXQiOjE3NDI0NTYyOTR9.76bAK6jFScOwtphK_rlCEBbfhll-LMUllQqVzx8R9D4"; // Adjust based on your storage method

    // If token exists, set it in the headers
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


  BoxPrizesPageNumber(filter:any): Observable<any>{
  
    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
    if (filter.Id) {
      params.Id = filter.Id;
    }
    if (filter.PrizeClass) {
      params.PrizeClass = filter.PrizeClass;
    }
    if (filter.Type) {
      params.Type = filter.Type;
    }
    if (filter.MinValueBefore) {
      params.MinValueBefore = filter.MinValueBefore;
    }
    if (filter.MaxValueBefore) {
      params.MaxValueBefore = filter.MaxValueBefore;
    }
    if (filter.MinValueAfter) {
      params.MinValueAfter = filter.MinValueAfter;
    }
    if (filter.MaxValueAfter) {
      params.MaxValueAfter = filter.MaxValueAfter;
    }
    if (filter.IsSuccess) {
      params.IsSuccess = filter.IsSuccess;
    }
    if (filter.Message) {
      params.Message = filter.Message;
    }
    if (filter.GameType) {
      params.GameType = filter.GameType;
    }
    if (filter.MinCreatedAt) {
      params.MinCreatedAt = filter.MinCreatedAt;
    }
    if (filter.MaxCreatedAt) {
      params.MaxCreatedAt = filter.MaxCreatedAt ;
    }

          this.http.get<any>(`https://extensions-test.challengex.app/api/box-prizes/reports`, {
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

  BoxPrizes(filter:any,pageNumber:number): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.Id) {
        params.Id = filter.Id;
      }
      if (filter.PrizeClass) {
        params.PrizeClass = filter.PrizeClass;
      }
      if (filter.Type) {
        params.Type = filter.Type;
      }
      if (filter.MinValueBefore) {
        params.MinValueBefore = filter.MinValueBefore;
      }
      if (filter.MaxValueBefore) {
        params.MaxValueBefore = filter.MaxValueBefore;
      }
      if (filter.MinValueAfter) {
        params.MinValueAfter = filter.MinValueAfter;
      }
      if (filter.MaxValueAfter) {
        params.MaxValueAfter = filter.MaxValueAfter;
      }
      if (filter.IsSuccess) {
        params.IsSuccess = filter.IsSuccess;
      }
      if (filter.Message) {
        params.Message = filter.Message;
      }
      if (filter.GameType) {
        params.GameType = filter.GameType;
      }
      if (filter.MinCreatedAt) {
        params.MinCreatedAt = filter.MinCreatedAt;
      }
      if (filter.MaxCreatedAt) {
        params.MaxCreatedAt = filter.MaxCreatedAt ;
      }
    
        this.http.get<any>(`https://extensions-test.challengex.app/api/box-prizes/reports?pageNumber=${pageNumber}`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.items;

          // Transform the items to match GameData structure
          const transformedData: BoxPrizesData[] = items.map((item: { prizeValue:any; id: any; prizeClass: any; user: { id:any; name: any; }; gameType: any; type: any; message:any; valueBefore: any; valueAfter: any; isSuccess: any; created: string | number | Date; }) => ({
            id: item.id,
            prizeClass: item.prizeClass,
            userName: item.user.name,
            userId: item.user.id,
            gameType: item.gameType,
            type: item.type,
            valueBefore: item.valueBefore,
            valueAfter: item.valueAfter, // Format duration
            isSuccess: item.isSuccess,
            message: item.message,
            prizeValue: item.prizeValue,
            created: new Date(item.created)
          }))

          observer.next(transformedData);
          observer.complete();


          }, error => {
        observer.error(error); // Handle errors
      });
    });
  }
}
