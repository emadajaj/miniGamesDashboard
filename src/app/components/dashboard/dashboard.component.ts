import { Component, OnInit, ViewChild } from '@angular/core';
import { Game, GamesService } from '../../stores/games-managment-store/games.services';
import { GameUsersService } from '../../stores/games-users-managment-store/games-users.services';
import { PopUpComponent } from '../popUp/pop-up.component';
import { Router } from '@angular/router';
import { GameSettings, GamesSettingsService } from '../../stores/games-settings-management-store/games-settings.services';


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
  selectedGameSettings?: GameSettings;
  tabss: Tab[] = [
    {
      navigateTo: 'dashboard/store/like-card',
      name: 'Like Cards',
      imageURL: 'credit-card.png'
    },
    {
      navigateTo: 'dashboard/store/products',
      name: 'Products',
      imageURL: 'product.png'
    },      {
      navigateTo: 'dashboard/store/products-serials',
      name: 'Products Serials',
      imageURL: 'barcode.png'
    },      {
      navigateTo: 'dashboard/store/orders',
      name: 'Orders',
      imageURL: 'order.png'
    },      {
      navigateTo: 'dashboard/store/gems-log',
      name: 'Gems Log',
      imageURL: 'gem.png'
    },     
    {
      navigateTo: 'dashboard/store/like-card-transaction',
      name: 'Transaction',
      imageURL: 'transaction.png'
    },
  ];


  constructor(
    private gamesService: GamesService,
    private gameUsersService: GameUsersService,
    private router:Router
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
    if (tab === 'store') {
      this.activeTab = 'store';
      this.showStoreChildren = !this.showStoreChildren; // Toggle visibility
      if (!this.showStoreChildren) {
        this.activeTab = 'store';
        this.activeChildTab = null;
      }
    }else if (tab === 'Like Cards') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Mile Stones') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Box Prizes') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Message') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Game Prizes') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Ranking Awards') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Top Players Log') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Game Users Log') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Transaction') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Orders') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Gems Log') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Products') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'Products Serials') {
      this.activeTab = tab;
      this.activeChildTab = tab;
      this.showStoreChildren = true;
    }
    else if (tab === 'arcade') {
      this.activeTab = 'arcade'; // If hiding, reset active tab to 'arcade'
      this.showArcadeChildren = !this.showArcadeChildren; // Toggle visibility
      
        this.activeTab = 'arcade'; // If hiding, reset active tab to 'arcade'
        this.activeChildTab = null;
      
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
    const products = "Products"
    const productsSerials = "Products Serials"
    const orders = "Orders"
    const gemsLog = "Gems Log"
    const likeCardTransaction = "Transaction"
    const mileStones = "Mile Stones"
    const gameUsersLog = "Game Users Log"
    const topPlayersLog = "Top Players Log"
    const rankingAwards = "Ranking Awards"
    const gamePrizes = "Game Prizes"
    const boxPrizes = "Box Prizes"
    const message = "Message"







    const games = ""
    const gameSetting = "";

    if (game) {
      return game.name;
    }
    
    if(likeCards == this.activeChildTab){
      return likeCards;
    }
    if(boxPrizes == this.activeChildTab){
      return boxPrizes;
    }
    if(message == this.activeChildTab){
      return message;
    }
    if(rankingAwards == this.activeChildTab){
      return rankingAwards;
    }
    if(gamePrizes == this.activeChildTab){
      return gamePrizes;
    }
    if(gameUsersLog == this.activeChildTab){
      return gameUsersLog;
    }
    if(topPlayersLog == this.activeChildTab){
      return topPlayersLog;
    }
    if(mileStones == this.activeChildTab){
      return mileStones;
    }
    if(likeCardTransaction == this.activeChildTab){
      return likeCardTransaction;
    }
    if(gemsLog == this.activeChildTab){
      return gemsLog;
    }
    if(orders == this.activeChildTab){
      return orders;
    }
    if(products == this.activeChildTab){
      return products;
    }
    if(productsSerials == this.activeChildTab){
      return productsSerials;
    }
    if(games == this.activeTab){
      return games;
    }
    if(gameSetting == this.activeTab){
      return gameSetting;
    }
    // Otherwise, use the default tab titles
    switch(this.activeTab) {
      case 'arcade': 
        return this.activeChildTab === 'action' ? 'Action Arcade Games' : '';
      case 'settings': 
      return this.activeChildTab === 'action' ? 'Action Arcade Games' : '';
      case 'store': 
      return this.activeChildTab === 'action' ? 'Action Arcade Games' : '';
      case 'metrics': return 'Dashboard Metrics';
      case 'users': return 'Users';
      default: return 'Games';
    }
  }

  noTitleDontShowTheButtons():boolean{
    const name = this.getTabTitle()
    if(name == null){
      return false;
    }
    else if(name == 'Orders'){
      return false;
    }
    else if(name == 'Box Prizes'){
      return false;
    }
    else if(name == 'Ranking Awards'){
      return false;
    }
    else if(name == 'Game Users Log'){
      return false;
    }
    else if(name == 'Top Players Log'){
      return false;
    }
    else if(name == 'Transaction'){
      return false;
    }
    else if(name == 'Gems Log'){
      return false;
    }
    else if(name == 'Dashboard Metrics'){
      return false;
    }
    else if(name == 'Like Cards'){
      return false;
    }
    else if(name == 'Products'){
      return false;
    }
    else if(name == 'Products Serials'){
      return false;
    }
    else if(name == 'Mile Stones'){
      return false;
    }
    else if(name == ''){
      return false;
    }
    else if(name == 'Users'){
      return false;
    }
    else if(name == 'Game Prizes'){
      return false;
    }
    else if(name == 'Message'){
      return false;
    }
    return true;
  }
  buttonsForGameUsersTable():boolean{
    const name = this.getTabTitle()
    if(name == 'Users'){
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
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}


export interface Tab {
  navigateTo: string;
  imageURL:  string;
  name:  string;
}