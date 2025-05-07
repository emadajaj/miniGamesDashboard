import { ProductsSerialsData, ProductsSerialsService } from './../../stores/products-serials-management-store/products-serials.services';
import { Component, OnInit, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';

@Component({
  selector: 'app-products-serials-table',
  templateUrl: './products-serials-table.component.html',
  styleUrls: ['./products-serials-table.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class ProductsSerialsTableComponent implements OnInit, OnChanges {

  scoreIds!: any[];
  id:any



  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable(); // Observable to expose current page
  pageSize = 10;
  totalItems = 0;
  pagesCount: Observable<number> | undefined;
  
  filter = {
    ProductId: '',
    OwnerId:'',
    Code:'',
    SerialNumber: '',
    MinValidTo:'',
    MaxValidTo:'',
    };
    type: string = 'date';
    // Standard columns for all games
    standardColumns: GameColumn[] = [
        { key: 'productId', name: 'Product ID', type: 'text' },
        { key: 'productName', name: 'Product Name', type: 'text' },
        { key: 'ownerId', name: 'Owner ID', type: 'text' },
        { key: 'ownerName', name: 'Owner Name', type: 'text' },
        { key: 'code', name: 'Code', type: 'text' },
        { key: 'serialNumber', name: 'Serial Number', type: 'text' },
        { key: 'validTo', name: 'Valid To', type: 'date' }
      ];

  constructor(private productsSerialsService: ProductsSerialsService) {}


  paginatedData: ProductsSerialsData[] = [];

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
    this.productsSerialsService.ProductsSerialsPageNumber(this.filter).subscribe(val => {
      this.pagesCount = of(val);
      console.log("dd" + val);
    });
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.productsSerialsService.ProductsSerials(this.filter,currentPage).subscribe(val => {
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