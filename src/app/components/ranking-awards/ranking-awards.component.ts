import { Component, OnInit,} from '@angular/core';
import { BehaviorSubject, Observable, of, filter } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { MileStonesData, MileStonesService } from '../../stores/mile-stones-management-store/mile-stones.services';
import { RankingAwardsData, RankingAwardsService } from '../../stores/ranking-awards-management-store/ranking-awards.services';

@Component({
  selector: 'app-ranking-awards-table',
  templateUrl: './ranking-awards.component.html',
  styleUrls: ['./ranking-awards.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class RankingAwardsTableComponent implements OnInit{

  constructor(private rankingAwardsService: RankingAwardsService, private toastr: ToastrService, private store:Store) {}
  scoreIds!: any[];
  id:any


  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable(); // Observable to expose current page
  pageSize = 10;
  totalItems = 0;
  pagesCount: Observable<number> | undefined;
  filter :any
  type: string = 'date';
    // Standard columns for all games
    standardColumns: GameColumn[] = [
        { key: 'action', name: 'Action', type: 'button' },
        { key: 'rank', name: 'Required Score', type: 'text' },
        { key: 'caption', name: 'Prize', type: 'text' },
        { key: 'imageURL', name: 'Image', type: 'image' },
      ];




  paginatedData: RankingAwardsData[] = [];

  ngOnInit(): void {
    this.resetPagination();
    
    
  }

  resetPagination(): void {
    this.currentPageSubject.next(1); // Reset to first page
    this.updatePaginatedData();
  }

  updatePageCount(): void {
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.rankingAwardsService.RankingAwards(this.filter,currentPage).subscribe(val => {
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

  }





