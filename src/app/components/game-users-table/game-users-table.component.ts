import { Component, OnInit, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';
import { GameUsersService, UserData } from '../../stores/games-users-managment-store/games-users.services';
import { PopUpComponent } from '../popUp/pop-up.component';

@Component({
  selector: 'app-game-users-table',
  templateUrl: './game-users-table.component.html',
  styleUrls: ['./game-users-table.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class GameUsersTableComponent implements OnInit, OnChanges {

  scoreIds!: any[];
  id:any

  @ViewChild('popup') popup!: PopUpComponent;
  popupMessage: string = '';
  yesAction: () => void = () => {};

      // Method to open the popup
      openPopup(rowData: UserData, action: string) {
        this.popupMessage = `Are you sure you want to ${action} for ${rowData.userName}?`;
        this.scoreIds = [rowData.id]
        this.id = rowData.id
        this.yesAction = () => this.handleAction(rowData, action);
        this.popup.show();
      }
    
      handleAction(rowData: UserData, action: string) {

        switch(action){
          case "block":
            this.gameUsersService.blockUser(this.id).subscribe(() => {
              console.log('Block User successfully');
            }, error => {
              console.error('Error Block User:', error);
            });
            console.log("Block user");
            break;
          case "unblock":
            this.gameUsersService.unblockUser(this.id).subscribe(() => {
              console.log('Block User successfully');
            }, error => {
              console.error('Error Block User:', error);
            });
            console.log("Unblock user");
            break;
          case "reset user score":
            this.gameUsersService.resetUserScore(this.scoreIds).subscribe(() => {
              console.log('User scores reset successfully');
            }, error => {
              console.error('Error resetting user scores:', error);
            });
            break;   
          case "reset user claims":
            this.gameUsersService.resetUserClaims(this.id).subscribe(() => {
              console.log('Block User successfully');
            }, error => {
              console.error('Error Block User:', error);
            });
            console.log("Reset User Claims");
            break;
            
        }
        // Implement your specific action logic based on the action type
        console.log(`Action: ${action} for ${rowData.userName}`);
        // For example, fetch more details, update, delete, etc.
      }


  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable(); // Observable to expose current page
  pageSize = 10;
  totalItems = 0;
  pagesCount: Observable<number> | undefined;
  country: { [key: string]: string } = {
      'suadi_Arabia' : 'Suadi Arabia',
      'jordan' : 'Jordan',
      'kuwait' : 'Kuwait',
      'emirates' : 'Emirates',
      'lebanon' : 'Lebanon',
      'oman' : 'Oman',
      'morocco' : 'Morocco',
      'test_Country' : 'Test_Country',
      'global' : 'Global',
      'egypt' : 'Egypt',
      'iraq' : 'Iraq',
      'iraq_IQD' : 'Iraq_IQD',
      'bahrain' : 'Bahrain',

    };
  filter = {
    id: '',
    name:'',
    country:'',
    maxScore: '',
    minScore:'',
    maxTotalAttempts:'',
    minTotalAttempts:'',
    gameType:'',
    MinCreatedAt:'',
    MaxCreatedAt:'',
    gameResult:''
  };
  type: string = 'date';
    // Standard columns for all games
    standardColumns: GameColumn[] = [
        { key: 'action', name: 'Action', type: 'button' },
        { key: 'id', name: 'User ID', type: 'number' },
        { key: 'userName', name: 'User Name', type: 'text' },
        { key: 'country', name: 'User Country', type: 'text' },
        { key: 'score', name: 'Score', type: 'number' },
        { key: 'awards', name: 'Awards', type: 'button' },
        { key: 'gems', name: 'Gems', type: 'button' },
        { key: 'isBlocked', name: 'Is Blocked', type: 'button' },
        { key: 'created', name: 'Created At', type: 'date' }
      ];

  constructor(private gameUsersService: GameUsersService) {}


  paginatedData: UserData[] = [];

  ngOnInit(): void {
    this.resetPagination();
    console.log(this.country);
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['game'] && !changes['game'].firstChange) {
      this.updatePageCount();
      this.resetPagination();
    }
  }

  resetPagination(): void {
    this.currentPageSubject.next(1); // Reset to first page
    this.updatePaginatedData();
  }

  updatePageCount(): void {
    this.gameUsersService.fetchGameUsersPageNumber(this.filter).subscribe(val => {
      this.pagesCount = of(val);
      console.log("dd" + val);
    });
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.gameUsersService.fetchAllGamesUsersAttempts(this.filter,currentPage).subscribe(val => {
      console.log(currentPage);
      this.totalItems = val.length; // Update total items
      this.paginatedData = val;
      console.log(this.paginatedData);
      
      
    });
  }

  goToPage(page: number): void {
    if (page < 1 || this.pagesCount) {
      this.pagesCount?.subscribe(totalPages => {
        if (page > totalPages) return;
      });
    }
    this.currentPageSubject.next(page); // Update current page
    this.updatePaginatedData();
  }

  previousPage(): void {
    const currentPage = this.currentPageSubject.getValue();
    if (currentPage > 1) {
      this.goToPage(currentPage - 1);
    }
  }

  nextPage(): void {
    const currentPage = this.currentPageSubject.getValue();
    this.goToPage(currentPage + 1);
  }

  changePageSize(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.pageSize = parseInt(select.value, 10);
    this.currentPageSubject.next(1); // Reset to first page
    this.updatePaginatedData();
  }

  getDisplayValue(item: any, column: GameColumn): string {
    const value = item[column.key];
    
    if (value === null || value === undefined) {
      return '';
    }
    
    if (column.type === 'date' && value instanceof Date) {
      return value.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
    
    return value.toString();
  }

  getPageRange(): string {
    const start = (this.currentPageSubject.getValue() - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, this.totalItems);
    return `${start}-${end}`;
  }

  goToLastPage(): void {
    if (this.pagesCount) {
      this.pagesCount.subscribe(totalPages => {
        if (totalPages > 0) {
          this.goToPage(totalPages);
        }
      });
    }
  }
  isDateInput1: boolean = false;
  isDateInput2: boolean = false;

  toggleInputType1() {
    this.isDateInput1 = true;
  }
  toggleInputType2() {
    this.isDateInput2 = true;
  }
  @HostListener('document:click', ['$event.target'])
  onClick(targetElement: HTMLElement) {
    const clickedInside1 = targetElement.closest('.date-input-container1');
    const clickedInside2 = targetElement.closest('.date-input-container2');

    if (!clickedInside1) {
      this.isDateInput1 = false; // Change back to text if clicked outside the first input
    }

    if (!clickedInside2) {
      this.isDateInput2 = false; // Change back to text if clicked outside the second input
    }
  }





}