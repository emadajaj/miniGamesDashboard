import { Component, OnInit, ViewChild } from '@angular/core';
import { Game, GamesService } from '../../stores/games-managment-store/games.services';
import { GameUsersService } from '../../stores/games-users-managment-store/games-users.services';
import { PopUpComponent } from '../popUp/pop-up.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  activeTab: string = 'metrics';
  activeChildTab: string | null = null;
  showArcadeChildren: boolean = false;
  showStoreChildren: boolean = false;
  games: Game[] = [];
  selectedGame?: Game;

  constructor(
    private gamesService: GamesService,
    private gameUsersService: GameUsersService
  ) {}


  @ViewChild('popup') popup!: PopUpComponent;
  popupMessage: string = '';
  yesAction: () => void = () => {};

      // Method to open the popup
      openPopup(action: string) {
        this.popupMessage = `Are you sure you want to ${action} for all Users?`;
        this.yesAction = () => this.handleAction(action);
        this.popup.show();
      }
    
      handleAction(action: string) {
        switch(action){
          case "reset score":
            this.gameUsersService.resetUsesScore().subscribe(() => {
              console.log('Reset Score for All Users successfully');
            }, error => {
              console.error('Error Block User:', error);
            });
            console.log("Reset Score For All Users");
            break; 
        }
        // For example, fetch more details, update, delete, etc.
      }



  ngOnInit(): void {
    this.games = this.gamesService.getGames();
    // Set default game if available
    if (this.games.length > 0) {
      this.selectedGame = this.games[0];
    }
  }
  setActiveTab(tab: string): void {
    if(tab === 'store'){
      this.activeTab = 'store'; // If hiding, reset active tab to 'arcade'
      this.showStoreChildren = true;
      console.log(this.showStoreChildren);
      
      if (this.showStoreChildren) {
        this.activeTab = 'store'; // If hiding, reset active tab to 'arcade'
        this.activeChildTab = null;
      }
    }else if (tab === 'Like Cards') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'arcade') {
      this.activeTab = 'arcade'; // If hiding, reset active tab to 'arcade'
      this.showArcadeChildren = !this.showArcadeChildren; // Toggle visibility
      if (!this.showArcadeChildren) {
        this.activeTab = 'arcade'; // If hiding, reset active tab to 'arcade'
        this.activeChildTab = null;
      }
    } else if (this.games.some(game => game.id === tab)) {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showArcadeChildren = true; // Ensure children are visible when a game is selected
      this.selectedGame = this.games.find(game => game.id === tab);
    } 
    else {
      this.activeTab = tab;
      this.activeChildTab = null;
      this.showArcadeChildren = false;
      this.showStoreChildren = false;
      console.log(this.showStoreChildren);
    }
  }


  getTabTitle(): string {
    // Check if it's a game tab
    const game = this.games.find(g => g.id === this.activeTab);
    const likeCards = "Like Cards"
    if (game) {
      return game.name;
    }
    
    if(likeCards == this.activeChildTab){
      return likeCards;
    }
    // Otherwise, use the default tab titles
    switch(this.activeTab) {
      case 'arcade': 
        return this.activeChildTab === 'action' ? 'Action Arcade Games' : 'Racing Arcade Games';
      case 'store': 
      return this.activeChildTab === 'action' ? 'Action Arcade Games' : 'Racing Arcade Games';
      case 'metrics': return 'Dashboard Metrics';
      case 'users': return 'Dashboard Users';
      default: return 'Games';
    }
  }

  noTitleDontShowTheButtons():boolean{
    const name = this.getTabTitle()
    if(name == null){
      return false;
    }
    else if(name == 'Dashboard Metrics'){
      return false;
    }
    else if(name == 'Like Cards'){
      return false;
    }
    else if(name == 'Racing Arcade Games'){
      return false;
    }
    else if(name == 'Dashboard Users'){
      return false;
    }
    return true;
  }
  buttonsForGameUsersTable():boolean{
    const name = this.getTabTitle()
    if(name == 'Dashboard Users'){
      return true;
    }
    return false;
  }

  resetUsersScore(){
    this.gameUsersService.resetUsesScore().subscribe(() => {
      console.log('Reset Score for All Users successfully');
    }, error => {
      console.error('Error Block User:', error);
    });
  }

  dontShowTheTitle() :boolean{
    const name = this.getTabTitle()
    if(name == 'Dashboard Metrics'){
      return false;
    }
    else if(name == 'Racing Arcade Games'){
      return false;
    }
    return true;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  isGameTab(): boolean {
    return this.games.some(game => game.id === this.activeTab);
  }
  
  isGameSelected(): boolean {
    return !!this.selectedGame;
  }
}
