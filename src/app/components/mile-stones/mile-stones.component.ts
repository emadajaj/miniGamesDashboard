import { ProductData, ProductService } from '../../stores/products-management-store/products.services';
import { Component, OnInit, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';
import { PopUpComponent } from '../popUp/pop-up.component';
import { LikeCardData, LikeCardsService } from '../../stores/like-card-products-management-store/like-card-products.services';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../stores/like-card-products-management-store/action/like-card-products.action';
import { MileStonesData, MileStonesService } from '../../stores/mile-stones-management-store/mile-stones.services';

@Component({
  selector: 'app-mile-stones-table',
  templateUrl: './mile-stones.component.html',
  styleUrls: ['./mile-stones.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class MileStonesTableComponent implements OnInit{

  constructor(private mileStonesService: MileStonesService, private toastr: ToastrService, private store:Store) {}
  scoreIds!: any[];
  id:any


  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable(); // Observable to expose current page
  pageSize = 10;
  totalItems = 0;
  pagesCount: Observable<number> | undefined;
    filter = {
      MinRequiredScore: '',
      MaxRequiredScore:'',
      MinNormal_LC_Prize:'',
      MaxNormal_LC_Prize: '',
    };
  type: string = 'date';
    // Standard columns for all games
    standardColumns: GameColumn[] = [
        { key: 'action', name: 'Action', type: 'button' },
        { key: 'requiredScore', name: 'Required Score', type: 'text' },
        { key: 'normal_LC_Prize', name: 'Prize', type: 'text' },
        { key: 'prizeImage', name: 'Image', type: 'image' },
      ];




  paginatedData: MileStonesData[] = [];

  ngOnInit(): void {
    this.resetPagination();
    
    
  }

  resetPagination(): void {
    this.currentPageSubject.next(1); // Reset to first page
    this.updatePaginatedData();
  }

  updatePageCount(): void {
    this.mileStonesService.MileStonesPageNumber(this.filter).subscribe(val => {
      this.pagesCount = of(val);
      console.log("dd" + val);
    });
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.mileStonesService.MileStones(this.filter,currentPage).subscribe(val => {
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





