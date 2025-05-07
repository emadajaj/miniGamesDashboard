import { ProductData, ProductService } from './../../stores/products-management-store/products.services';
import { Component, OnInit, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';
import { PopUpComponent } from '../popUp/pop-up.component';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../stores/like-card-products-management-store/action/like-card-products.action';

@Component({
  selector: 'app-products-table',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class ProductsTableComponent implements OnInit{

  constructor(private productService: ProductService, private toastr: ToastrService, private store:Store) {}
  scoreIds!: any[];
  id:any

  @ViewChild('popup') popup!: PopUpComponent;
  popupMessage: string = '';
  yesAction: (price:number) => void = () => {};

      // Method to open the popup
      openPopup(rowData: ProductData) {
        this.scoreIds = [rowData.id]
        this.id = rowData.id 
        this.yesAction = (price) => {     
          console.log(price);
             
          this.toastr.success('Product Edited Successfully'); // Show error message
          
              const productData = {
                id: rowData.id,
                categoryId: rowData.categoryId,
                title: rowData.title,
                price: price,
                imageURL: rowData.imageURL
              };
              this.store.dispatch(ProductActions.editProduct({ product: productData }));
              console.log(productData);
          console.log(price);

              

          ;}

        this.popup.show();
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
      Id: '',
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
        { key: 'id', name: 'ID', type: 'number' },
        { key: 'title', name: 'Name', type: 'text' },
        { key: 'price', name: 'Price', type: 'number' },
        { key: 'imageURL', name: 'Image', type: 'image' },
        { key: 'categoryId', name: 'Category ID', type: 'text' },
        { key: 'country', name: 'Country', type: 'text' },
        { key: 'isEnabled', name: 'Is Enabled', type: 'image' },
      ];




  paginatedData: ProductData[] = [];

  ngOnInit(): void {
    this.resetPagination();
    console.log(this.country);
    
    
  }

  resetPagination(): void {
    this.currentPageSubject.next(1); // Reset to first page
    this.updatePaginatedData();
  }

  updatePageCount(): void {
    this.productService.ProductPageNumber(this.filter).subscribe(val => {
      this.pagesCount = of(val);
      console.log("dd" + val);
    });
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.productService.ProductsCards(this.filter,currentPage).subscribe(val => {
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





