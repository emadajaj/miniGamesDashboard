import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'button';
}

export interface UserData {
  id: number;
  name: string;
  userName:string
  country: string;
  score: number;
  isBlocked: boolean;
  created: Date;
}


@Injectable({
  providedIn: 'root'
})
export class GameUsersService {



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


  fetchGameUsersPageNumber(filter:any): Observable<any>{
  
    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.id) {
        params.id = filter.id;
      }
      if (filter.name) {
        params.name = filter.name;
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

        this.http.get<any>(`https://extensions-test.challengex.app/api/games-users`, {
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

  fetchAllGamesUsersAttempts(filter:any,pageNumber:number): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
    if (filter.id) {
        params.id = filter.id;
    }
    if (filter.name) {
      params.name = filter.name;
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
    
        this.http.get<any>(`https://extensions-test.challengex.app/api/games-users?pageNumber=${pageNumber}`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.data.items;

          // Transform the items to match UserData structure
          const transformedData: UserData[] = items.map((item: { id: any; name: any; country: any; score: any; created: string | number | Date; }) => ({
            id: item.id,
            userName: item.name,
            country: item.country,
            score: item.score,
            created: new Date(item.created)
          }))

          observer.next(transformedData);
          observer.complete();


          }, error => {
        observer.error(error); // Handle errors
      });
    });
  }
  resetUsesScore(): Observable<void> {
    return new Observable(observer => {
      this.http.put<void>(`https://extensions-test.challengex.app/api/games-users/reset-score`,{
        headers: this.createHeaders(),
      }).subscribe(() => {
        console.log('Request successful');
        observer.complete();
      }, error => {
        console.error('Request failed:', error);
        observer.error(error);
      });
    });
  }
  resetUserScore(scoreIds: string[]): Observable<void> {
    console.log('Sending score IDs:', scoreIds);
    return new Observable(observer => {
      this.http.put<void>('https://extensions-test.challengex.app/api/games-users/reset-score-ids', scoreIds, {
        headers: this.createHeaders(),
      }).subscribe(() => {
        console.log('Request successful');
        observer.complete();
      }, error => {
        console.error('Request failed:', error);
        observer.error(error);
      });
    });
  }

  blockUser(id: any): Observable<void> {
    return new Observable(observer => {
      this.http.put<void>(`https://extensions-test.challengex.app/api/games-users/${id}/block`,{
        headers: this.createHeaders(),
      }).subscribe(() => {
        console.log('Request successful');
        observer.complete();
      }, error => {
        console.error('Request failed:', error);
        observer.error(error);
      });
    });
  }

  unblockUser(id: any): Observable<void> {
    return new Observable(observer => {
      this.http.put<void>(`https://extensions-test.challengex.app/api/games-users/${id}/unblock`,{
        headers: this.createHeaders(),
      }).subscribe(() => {
        console.log('Request successful');
        observer.complete();
      }, error => {
        console.error('Request failed:', error);
        observer.error(error);
      });
    });
  }

  resetUserClaims(id: any): Observable<void> {
    return new Observable(observer => {
      this.http.put<void>(`https://extensions-test.challengex.app/api/games-users/${id}/reset-claims`,{
        headers: this.createHeaders(),
      }).subscribe(() => {
        console.log('Request successful');
        observer.complete();
      }, error => {
        console.error('Request failed:', error);
        observer.error(error);
      });
    });
  }


}
