import { OrdersService } from '../../stores/orders-management-store/orders.services';
import { ProductsSerialsData, ProductsSerialsService } from '../../stores/products-serials-management-store/products-serials.services';
import { Component, OnInit, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';
import { OrdersData } from '../../stores/orders-management-store/orders.services';
import { GemsLogData, GemsLogService } from '../../stores/gems-log-management-store/gems-log.services';

@Component({
  selector: 'app-gems-log-table',
  templateUrl: './gems-log-table.component.html',
  styleUrls: ['./gems-log-table.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class GemsLogTableComponent implements OnInit, OnChanges {

  scoreIds!: any[];
  id:any

  // progress_Gift, marketPlace_Purchase, attempts_Purches, gems_Expired, box_Prize, box_Prize_Purches, system_Gift, system_Refund

  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable(); // Observable to expose current page
  pageSize = 10;
  totalItems = 0;
  pagesCount: Observable<number> | undefined;

  transactionMethod: { [key: string]: string } = {
    'progress_Gift' : 'Progress Gift',
    'marketPlace_Purchase' : 'MarketPlace Purchase',
    'attempts_Purches' : 'Attempts Parches',
    'gems_Expired' : 'Gems Expired',
    'box_Prize' : 'Box Prize',
    'box_Prize_Purches' : 'Box Prize Parches',
    'system_Gift' : 'System Gift',
    'system_Refund' : 'System Refund',
  };
  
  filter = {
    UserId: '',
    Transaction:'',
    Description: '',
    MinOperationTime:'',
    MaxOperationTime:'',
    MinValueAfter:'',
    MaxValueAfter:'',
    MinValueBefore:'',
    MaxValueBefore:'',
    };
    type: string = 'date';
    // Standard columns for all games
    standardColumns: GameColumn[] = [
        { key: 'userId', name: 'User ID', type: 'text' },
        { key: 'userName', name: 'User Name', type: 'text'},
        { key: 'transaction', name: 'Transaction', type: 'text'},
        { key: 'valueBefore', name: 'Value Before', type: 'number' },
        { key: 'valueAfter', name: 'Value After', type: 'number' },
        { key: 'description', name: 'Description', type: 'text' },
        { key: 'operationTime', name: 'Operation Time', type: 'date'},
        { key: 'changedAmount', name: 'Changed Amount', type: 'number' },
        { key: 'senderId', name: 'Sender ID', type: 'text' },
      ];

  constructor(private gemsLogService: GemsLogService) {}


  paginatedData: GemsLogData[] = [];

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
    this.gemsLogService.GemsLogPageNumber(this.filter).subscribe(val => {
      this.pagesCount = of(val);
      console.log("dd" + val);
    });
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.gemsLogService.GemsLog(this.filter,currentPage).subscribe(val => {
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
    
    if (column.type === 'date') {
      return this.formatDate(value); // Format the date
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

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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