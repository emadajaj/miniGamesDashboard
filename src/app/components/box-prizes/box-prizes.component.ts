  import { Component, Input, OnInit, OnChanges, SimpleChanges, HostListener } from '@angular/core';
  import { BehaviorSubject, filter, Observable, of } from 'rxjs';
  import { Game, GameColumn, GameData, GamesService } from '../../stores/games-managment-store/games.services';
  import { BoxPrizesData, BoxPrizesService } from '../../stores/box-prizes-management-store/box-prizes.services';

  @Component({
    selector: 'app-box-prizes',
    templateUrl: './box-prizes.component.html',
    styleUrls: ['./box-prizes.component.css'], // corrected to 'styleUrls'
    standalone: false,
  })
  export class BoxPrizesTableComponent implements OnInit, OnChanges {
    scoreIds!: any[];
    id:any
    private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    currentPage$: Observable<number> = this.currentPageSubject.asObservable(); // Observable to expose current page
    pageSize = 10;
    totalItems = 0;
    pagesCount: Observable<number> | undefined;

    types: { [key: string]: string } = {
      'gem' : 'Gem',
      'score' : 'Score',
    };
    prizeClass: { [key: string]: string } = {
      'basic' : 'Basic',
      'rare' : 'Rare',
      'premium' : 'Premium',
    };
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
      PrizeClass: '',
      Type: '',
      MinValueBefore: '',
      MaxValueBefore: '',
      MinValueAfter: '',
      MaxValueAfter: '',
      IsSuccess: '',
      Message: '',
      GameType: '',
      MinCreatedAt: '',
      MaxCreatedAt: '',

    };
      type: string = 'date';
      // Standard columns for all games
      standardColumns: GameColumn[] = [
        { key: 'userId', name: 'User ID', type: 'text' },
        { key: 'userName', name: 'User Name', type: 'text' },
        { key: 'prizeClass', name: 'Prize Class', type: 'text' },
        { key: 'type', name: 'Type', type: 'text' },
        { key: 'prizeValue', name: 'Prize Value', type: 'text' },
        { key: 'valueBefore', name: 'Value Before', type: 'date' },
        { key: 'valueAfter', name: 'Value After', type: 'date' },
        { key: 'isSuccess', name: 'Is Success', type: 'text' },
        { key: 'message', name: 'Message', type: 'text' },
        { key: 'created', name: 'Created At', type: 'date' }
      ];

    constructor(private boxPrizesService: BoxPrizesService) {}


    paginatedData: BoxPrizesData[] = [];

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
      this.boxPrizesService.BoxPrizesPageNumber(this.filter).subscribe(val => {
        this.pagesCount = of(val);
        console.log("dd" + val);
      });
    }

    updatePaginatedData(): void {
      this.updatePageCount();
      const currentPage = this.currentPageSubject.getValue();
      this.boxPrizesService.BoxPrizes(this.filter,currentPage).subscribe(val => {
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