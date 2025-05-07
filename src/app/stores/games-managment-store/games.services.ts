import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'button' | 'image';
}

export interface GameData {
  id: number;
  userId: number;
  userName: string;
  gameType: string;
  gameResult: string;
  duration: string;
  gameScore: number;
  prizeScore: number;
  totalScore: number;
  totalAttempts: number;
  createdAt: Date;
}

export interface Game {
  id: string;
  name: string;
  icon: string;
  columns: GameColumn[];
  page: Observable<any[]>,
  data:  Observable<any[]>;
  api: string
  fetchData: (pageNumber: number, filter:any) => Observable<GameData[]>; // Add this line
}

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  // Standard columns for all games
  private standardColumns: GameColumn[] = [
    { key: 'id', name: 'ID', type: 'number' },
    { key: 'gameType', name: 'Game Type', type: 'text' },
    { key: 'userId', name: 'User ID', type: 'number' },
    { key: 'userName', name: 'User Name', type: 'text' },
    { key: 'gameResult', name: 'Game Result', type: 'text' },
    { key: 'duration', name: 'Duration', type: 'text' },
    { key: 'gameScore', name: 'Game Score', type: 'number' },
    { key: 'prizeScore', name: 'Prize Score', type: 'number' },
    { key: 'totalScore', name: 'Total Score', type: 'number' },
    { key: 'totalAttempts', name: 'Total Attempts', type: 'number' },
    { key: 'createdAt', name: 'Created At', type: 'date' }
  ];

  apiS: string[] = [
    "https://extensions-test.challengex.app/api/unlocky-game",
    "https://extensions-test.challengex.app/api/number-in-between-game",
    "https://extensions-test.challengex.app/api/basket-ball-game",
    "https://extensions-test.challengex.app/api/foot-ball-game",
    "https://extensions-test.challengex.app/api/helxi-jumb-game",
    "https://extensions-test.challengex.app/api/zig-zag-game",
    "https://extensions-test.challengex.app/api/crazy-golf-game",
    "https://extensions-test.challengex.app/api/riddle-room-game",
    "https://extensions-test.challengex.app/api/little-shroomy-game",
    "https://extensions-test.challengex.app/api/car-game",
    "https://extensions-test.challengex.app/api/ice-dash-game"
  ]
  private games: Game[] = [
    {
      id: 'unlocky',
      name: 'Unlocky',
      icon: '🔓',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[0],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[0]),
      api: "https://extensions-test.challengex.app/api/unlocky-game",
      fetchData: (pageNumber: number, filters:any ) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[0]) // Updated method
    },
    {
      id: 'guess-number',
      name: 'Guess Number',
      icon: '🔢',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[1],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[1]),
      api: "https://extensions-test.challengex.app/api/number-in-between-game",
      fetchData: (pageNumber: number , filters:any ) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[1]) // Updated method
    },
    {
      id: 'basketball',
      name: 'Basketball',
      icon: '🏀',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[2],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[2]),
      api: "https://extensions-test.challengex.app/api/basket-ball-game",
      fetchData: (pageNumber: number, filters:any) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[2]) // Updated method
    },
    {
      id: 'football',
      name: 'Football',
      icon: '⚽',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[3],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[3]),
      api: "https://extensions-test.challengex.app/api/foot-ball-game",
      fetchData: (pageNumber: number , filters:any ) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[3]) // Updated method
    },
    {
      id: 'helix-jump',
      name: 'Helix Jump',
      icon: '🌀',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[4],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[4]),
      api: "https://extensions-test.challengex.app/api/helxi-jumb-game",
      fetchData: (pageNumber: number , filters:any ) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[4]) // Updated method
    },
    {
      id: 'zig-zag',
      name: 'Zig Zag',
      icon: '↩️',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[5],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[5]),
      api: "https://extensions-test.challengex.app/api/zig-zag-game",
      fetchData: (pageNumber: number , filters:any) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[5]) // Updated method
    },
    {
      id: 'crazy-golf',
      name: 'Crazy Golf',
      icon: '⛳',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[6],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[6]),
      api: "https://extensions-test.challengex.app/api/crazy-golf-game",
      fetchData: (pageNumber: number , filters:any) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[6]) // Updated method
    },
    {
      id: 'riddle-room',
      name: 'Riddle Room',
      icon: '🧩',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[7],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[7]),
      api: "https://extensions-test.challengex.app/api/riddle-room-game",
      fetchData: (pageNumber: number  , filters:any) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[7]) // Updated method
    },
    {
      id: 'little-shroomy',
      name: 'Little Shroomy',
      icon: '🍄',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[8],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[8]),
      api: "https://extensions-test.challengex.app/api/little-shroomy-game",
      fetchData: (pageNumber: number , filters:any) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[8]) // Updated method
    },
    {
      id: 'mini-wheel',
      name: 'Mini Wheel',
      icon: '🎡',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[9],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[9]),
      api: "https://extensions-test.challengex.app/api/car-game",
      fetchData: (pageNumber: number , filters:any) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[9]) // Updated method
    },
    {
      id: 'ice-dash',
      name: 'Ice Dash',
      icon: '❄️',
      columns: this.standardColumns,
      page: this.fetchGamePageNumber(this.apiS[10],filter),
      data: this.fetchAllGamesAttempts(filter,1,this.apiS[10]),
      api: "https://extensions-test.challengex.app/api/ice-dash-game",
      fetchData: (pageNumber: number , filters:any) => this.fetchAllGamesAttempts(filters, pageNumber, this.apiS[10]) // Updated method
    }
  ];

  constructor(private http: HttpClient) {}

  getGames(): Game[] {
    return this.games;
  }

  getGameById(id: string): Game | undefined {
    return this.games.find(game => game.id === id);
  }


  private createHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NjcyZTUzMS0xZDc2LTQ0MjQtYWRkOC05NGUxNTliOGJjOTUiLCJzdWIiOiIyN2Q5ZWI4Ny04NWVhLWRmNjgtZjQzZS0yYjU4MTE3MTVlZjEiLCJpc3MiOiJodHRwczovL2NoYWxsZW5nZXhhcGkubGlrZTRhcHAuY29tLyIsInNlc3Npb24iOiJjMzRlYTI3Iiwicm9sZSI6WyJTVVBFUl9BRE1JTiIsIkFETUlOIl0sIm5iZiI6MTc0MjQ1NjI5NCwiZXhwIjoxNzQyNDU5ODk0LCJpYXQiOjE3NDI0NTYyOTR9.76bAK6jFScOwtphK_rlCEBbfhll-LMUllQqVzx8R9D4"; // Adjust based on your storage method

    // If token exists, set it in the headers
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }


  fetchGamePageNumber(game:string, filter:any): Observable<any>{
  
    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.userId) {
        params.userId = filter.userId;
    }
      if (filter.maxScore) {
        params.maxScore = filter.maxScore;
    }
    if (filter.minScore) {
      params.minScore = filter.minScore;
    }
      if (filter.maxTotalAttempts) {
        params.maxTotalAttempts = filter.maxTotalAttempts;
    }
    if (filter.minTotalAttempts) {
      params.minTotalAttempts = filter.minTotalAttempts;
    }
    if (filter.gameType) {
      params.gameType = filter.gameType;
    }
    if (filter.gameResult) {
      params.gameResult = filter.gameResult;
    }
    if (filter.MinCreatedAt) {
      params.MinCreatedAt = filter.MinCreatedAt;
    }
    if (filter.MaxCreatedAt) {
      params.MaxCreatedAt = filter.MaxCreatedAt ;
    }

                this.http.get<any>(`${game}`, {
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

  fetchAllGamesAttempts(filter:any,pageNumber:number,game:string): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

      // Add filters to params if they exist
      if (filter.userId) {
        params.userId = filter.userId;
    }
      if (filter.maxScore) {
        params.maxScore = filter.maxScore;
    }
    if (filter.minScore) {
      params.minScore = filter.minScore;
    }
      if (filter.maxTotalAttempts) {
        params.maxTotalAttempts = filter.maxTotalAttempts;
    }
    if (filter.minTotalAttempts) {
      params.minTotalAttempts = filter.minTotalAttempts;
    }
    if (filter.gameType) {
      params.gameType = filter.gameType;
    }
    if (filter.gameResult) {
      params.gameResult = filter.gameResult;
    }
    if (filter.MinCreatedAt) {
      params.MinCreatedAt = filter.MinCreatedAt;
    }
    if (filter.MaxCreatedAt) {
      params.MaxCreatedAt = filter.MaxCreatedAt ;
    }
    
        this.http.get<any>(`${game}?pageNumber=${pageNumber}`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.data.items;

          // Transform the items to match GameData structure
          const transformedData: GameData[] = items.map((item: { id: any; userId: any; user: { name: any; }; gameType: any; gameResult: any; duration: { minutes: any; seconds: any; }; score: any; boxPrizeScore: any; totalAttempts: any; created: string | number | Date; }) => ({
            id: item.id,
            userId: item.userId,
            userName: item.user.name,
            gameType: item.gameType,
            gameResult: item.gameResult,
            duration: item.duration, // Format duration
            gameScore: item.score,
            prizeScore: item.boxPrizeScore,
            totalScore: item.score + item.boxPrizeScore,
            totalAttempts: item.totalAttempts,
            createdAt: new Date(item.created)
          }))

          observer.next(transformedData);
          observer.complete();


          }, error => {
        observer.error(error); // Handle errors
      });
    });
  }
}
