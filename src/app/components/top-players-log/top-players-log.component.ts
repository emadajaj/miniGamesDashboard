import { Game } from './../../stores/games-managment-store/games.services';
import { ProductsSerialsData, ProductsSerialsService } from '../../stores/products-serials-management-store/products-serials.services';
import { Component, OnInit, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';
import { GamesUsersLogService, GameUsersLogData } from '../../stores/game-users-log-management-store/game-users-log.services';
import { TopPlayersLogData, TopPlayersLogService } from '../../stores/top-players-log-management-store/top-players-log.services';

@Component({
  selector: 'app-top-players-log',
  templateUrl: './top-players-log.component.html',
  styleUrls: ['./top-players-log.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class TopPlayersLogTableComponent implements OnInit, OnChanges {
  scoreIds!: any[];
  id:any
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
  game: { [key: string]: string } = {
    'unlockyGame' : 'Unlocky Game',
    'numberInBetweenGame' : 'Number In Between Game',
    'basketBallGame' : 'Basket Ball Game',
    'footBallGame' : 'Foot Ball Game',
    'helxiJumpGame' : 'Helxi Jump Game',
    'zigZagGame' : 'Zig Zag Game',
    'crazyGolfGame' : 'Crazy Golf Game',
    'riddleRoomGame' : 'Riddle Room Game',
    'littleShroomyGame' : 'Little Shroomy Game',
    'carGame' : 'Car Game',
    'iceDashGame' : 'Ice Dash Game',
  };
  
  filter = {
    UserId: '',
    name:'',
    country: '',
    game: '',
    MinScore:'',
    MaxScore:'',
    MinCreatedAt:'',
    MaxCreatedAt:'',
    };
    type: string = 'date';
    // Standard columns for all games
    standardColumns: GameColumn[] = [
        { key: 'id', name: 'ID', type: 'text' },
        { key: 'userId', name: 'User ID', type: 'text' },
        { key: 'name', name: 'Name', type: 'text' },
        { key: 'country', name: 'Country', type: 'text' },
        { key: 'score', name: 'Score', type: 'text' },
        { key: 'boxPrizeScore', name: 'Box Prize Score', type: 'text' },
        { key: 'totalScore', name: 'Total Score', type: 'text' },
        { key: 'game', name: 'Game', type: 'text' },
        { key: 'created', name: 'Created At', type: 'date' }
      ];

  constructor(private topPlayersLogService: TopPlayersLogService) {}


  paginatedData: TopPlayersLogData[] = [];

  ngOnInit(): void {
    this.resetPagination();    
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
    this.topPlayersLogService.TopPlayersLogPageNumber(this.filter).subscribe(val => {
      this.pagesCount = of(val);
      console.log("dd" + val);
    });
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.topPlayersLogService.TopPlayersLog(this.filter,currentPage).subscribe(val => {
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