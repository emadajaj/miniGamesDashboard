import { Component, OnInit, OnChanges, SimpleChanges, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GameColumn} from '../../stores/games-managment-store/games.services';
import { PopUpComponent } from '../popUp/pop-up.component';
import { LikeCardData, LikeCardsService } from '../../stores/like-card-products-management-store/like-card-products.services';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../stores/like-card-products-management-store/action/like-card-products.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-like-cards-table',
  templateUrl: './like-cards-table.component.html',
  styleUrls: ['./like-cards-table.component.css'], // corrected to 'styleUrls'
  standalone: false,
})
export class LikeCardsTableComponent implements OnInit{

  constructor(private likeCardsService: LikeCardsService, private toastr: ToastrService, private store:Store , private router:Router) {}
  scoreIds!: any[];
  id:any

  @ViewChild('popup') popup!: PopUpComponent;
  popupMessage: string = '';
  yesAction: (price:number) => void = () => {};

      // Method to open the popup
      openPopup(rowData: LikeCardData) {
        this.scoreIds = [rowData.productId]
        this.id = rowData.productId 
        this.yesAction = (price) => {        

          
              const productData = {
                id: rowData.productId,
                categoryId: rowData.categoryId,
                title: rowData.productName,
                price: price,
                imageURL: rowData.productImage
              };
              if(price >0 ){
                this.toastr.success('Product Added Successfully'); // Show error message
                this.store.dispatch(ProductActions.addProduct({ product: productData }));
               
              }
              this.navigateTo()
              console.log(productData);


          ;}

        this.popup.show();
      }
    
     

  private currentPageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$: Observable<number> = this.currentPageSubject.asObservable(); // Observable to expose current page
  pageSize = 10;
  totalItems = 0;
  price: number =0;
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
  };
  type: string = 'date';
    // Standard columns for all games
    standardColumns: GameColumn[] = [
        { key: 'action', name: 'Action', type: 'button' },
        { key: 'productId', name: 'ID', type: 'number' },
        { key: 'productName', name: 'Name', type: 'text' },
        { key: 'productPrice', name: 'Price', type: 'number' },
        { key: 'productCurrency', name: 'currency', type: 'text' },
        { key: 'productImage', name: 'Image', type: 'image' },
        { key: 'categoryId', name: 'Category ID', type: 'text' },
        { key: 'available', name: 'Available', type: 'image' },
      ];




  paginatedData: LikeCardData[] = [];

  ngOnInit(): void {
    this.resetPagination();
    console.log(this.country);
    
    
  }

  resetPagination(): void {
    this.currentPageSubject.next(1); // Reset to first page
    this.updatePaginatedData();
  }

  updatePageCount(): void {
    this.likeCardsService.fetchLikeCardsPageNumber(this.filter).subscribe(val => {
      this.pagesCount = of(val);
      console.log("dd" + val);
    });
  }

  updatePaginatedData(): void {
    this.updatePageCount();
    const currentPage = this.currentPageSubject.getValue();
    this.likeCardsService.fetchLikeCards(this.filter,currentPage).subscribe(val => {
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

  navigateTo() {
    this.router.navigate(["dashboard/store/products"]);
  }

  }





