import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';

export interface GameColumn {
  key: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'button' | 'image';
}

export interface GameSettingsData {
  action: any;
  key: string;
  value: string;
  joins:string;
}

export interface GameSettings {
  id: string;
  name: string;
  icon: string;
  columns: GameColumn[];
  data:  Observable<any[]>;
  api: string
  fetchData: Observable<GameSettingsData[]>; // Add this line
}

@Injectable({
  providedIn: 'root'
})
export class GamesSettingsService {
  // Standard columns for all games
  private standardColumns: GameColumn[] = [
    { key: 'action', name: 'Action', type: 'button' },
    { key: 'key', name: 'Key', type: 'text' },
    { key: 'value', name: 'Value', type: 'number' },
  ];

  apiS: string[] = [
    "https://extensions-test.challengex.app/api/games-settings/unlocky-game",
    "https://extensions-test.challengex.app/api/games-settings/number-in-between-game",
    "https://extensions-test.challengex.app/api/games-settings/basket-ball-game",
    "https://extensions-test.challengex.app/api/games-settings/foot-ball-game",
    "https://extensions-test.challengex.app/api/games-settings/helxi-jumb-game",
    "https://extensions-test.challengex.app/api/games-settings/zig-zag-game",
    "https://extensions-test.challengex.app/api/games-settings/crazy-golf-game",
    "https://extensions-test.challengex.app/api/games-settings/riddle-room-game",
    "https://extensions-test.challengex.app/api/games-settings/little-shroomy-game",
    "https://extensions-test.challengex.app/api/games-settings/car-game",
    "https://extensions-test.challengex.app/api/games-settings/ice-dash-game"
  ]
  private gameSettings: GameSettings[] = [
    {
      id: 'unlocky',
      name: 'Unlocky',
      icon: '🔓',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[0]),
      api: "https://extensions-test.challengex.app/api/games-settings/unlocky-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[0]) // Updated method
    },
    {
      id: 'guess-number',
      name: 'Guess Number',
      icon: '🔢',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[1]),
      api: "https://extensions-test.challengex.app/api/games-settings/number-in-between-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[1]) // Updated method
    },
    {
      id: 'basketball',
      name: 'Basketball',
      icon: '🏀',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[2]),
      api: "https://extensions-test.challengex.app/api/games-settings/basket-ball-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[2]) // Updated method
    },
    {
      id: 'football',
      name: 'Football',
      icon: '⚽',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[3]),
      api: "https://extensions-test.challengex.app/api/games-settings/foot-ball-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[3]) // Updated method
    },
    {
      id: 'helix-jump',
      name: 'Helix Jump',
      icon: '🌀',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[4]),
      api: "https://extensions-test.challengex.app/api/games-settings/helxi-jumb-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[4]) // Updated method
    },
    {
      id: 'zig-zag',
      name: 'Zig Zag',
      icon: '↩️',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[5]),
      api: "https://extensions-test.challengex.app/api/games-settings/zig-zag-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[5]) // Updated method
    },
    {
      id: 'crazy-golf',
      name: 'Crazy Golf',
      icon: '⛳',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[6]),
      api: "https://extensions-test.challengex.app/api/games-settings/crazy-golf-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[6]) // Updated method
    },
    {
      id: 'riddle-room',
      name: 'Riddle Room',
      icon: '🧩',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[7]),
      api: "https://extensions-test.challengex.app/api/games-settings/riddle-room-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[7]) // Updated method
    },
    {
      id: 'little-shroomy',
      name: 'Little Shroomy',
      icon: '🍄',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[8]),
      api: "https://extensions-test.challengex.app/api/games-settings/little-shroomy-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[8]) // Updated method
    },
    {
      id: 'mini-wheel',
      name: 'Mini Wheel',
      icon: '🎡',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[9]),
      api: "https://extensions-test.challengex.app/api/games-settings/car-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[9]) // Updated method
    },
    {
      id: 'ice-dash',
      name: 'Ice Dash',
      icon: '❄️',
      columns: this.standardColumns,
      data: this.fetchAllGamesAttempts(this.apiS[10]),
      api: "https://extensions-test.challengex.app/api/games-settings/ice-dash-game",
      fetchData: this.fetchAllGamesAttempts(this.apiS[10]) // Updated method
    }
  ];

  constructor(private http: HttpClient) {}

  getGames(): GameSettings[] {
    return this.gameSettings;
  }

  getGameById(id: string): GameSettings | undefined {
    return this.gameSettings.find(game => game.id === id);
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


  fetchAllGamesAttempts(gameSettings:string): Observable<any[]> {
    const allItems: any[] = [];

    return new Observable(observer => {
      const params: any = {};

    
        this.http.get<any>(`${gameSettings}`, {
          headers: this.createHeaders(),
          params:params
        }).subscribe(response => {
          const items = response.data;

          // Transform the items to match GameData structure
          const transformedData: GameSettingsData[] = items.map((item: { joins: any; maxAttemptsPerFreeJoin: any; additionalFreeJoinAttempts: any; maxAttemptsPerPaidJoin: any; paidAttemptsCost: any; maxAttemptsPerAd: any; scoreMultiplier: any;}) => ({
            joins: item.joins,
            maxAttemptsPerFreeJoin: item.maxAttemptsPerFreeJoin,
            additionalFreeJoinAttempts: item.additionalFreeJoinAttempts,
            maxAttemptsPerPaidJoin: item.maxAttemptsPerPaidJoin,
            paidAttemptsCost: item.paidAttemptsCost,
            maxAttemptsPerAd: item.maxAttemptsPerAd, // Format duration
            scoreMultiplier: item.scoreMultiplier,
          }))

          observer.next(transformedData);
          observer.complete();


          }, error => {
        observer.error(error); // Handle errors
      });
    });
  }
}
