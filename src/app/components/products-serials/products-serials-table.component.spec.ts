import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsSerialsTableComponent } from './products-serials-table.component';


describe('ProductsSerialsTableComponent', () => {
  let component: ProductsSerialsTableComponent;
  let fixture: ComponentFixture<ProductsSerialsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSerialsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsSerialsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
